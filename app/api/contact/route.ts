import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_API_URL = "https://api.resend.com/emails";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    const name = payload.name?.trim() || "";
    const email = payload.email?.trim() || "";
    const message = payload.message?.trim() || "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.CONTACT_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "aunik15711@gmail.com";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "Portfolio Contact <onboarding@resend.dev>";

    if (!resendApiKey) {
      return NextResponse.json(
        { message: "Server email is not configured yet." },
        { status: 500 }
      );
    }

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Resend error:", resendResponse.status, resendError);
      return NextResponse.json(
        { message: "Email service failed. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }
}
