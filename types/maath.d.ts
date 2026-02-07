declare module "maath/random/dist/maath-random.esm" {
  type TypedArray =
    | Float32Array
    | Float64Array
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array;

  export function inSphere(
    buffer: TypedArray,
    sphere?: { radius?: number; center?: number[] },
  ): TypedArray;
  export function inBox(
    buffer: TypedArray,
    box?: { sides?: number[] | number; center?: number[] },
  ): TypedArray;
  export function inRect(
    buffer: TypedArray,
    rect?: { sides?: number[] | number; center?: number[] },
  ): TypedArray;
  export function inCircle(
    buffer: TypedArray,
    circle?: { radius?: number; center?: number[] },
  ): TypedArray;
  export function onSphere(
    buffer: TypedArray,
    sphere?: { radius?: number; center?: number[] },
  ): TypedArray;
  export function onBox(
    buffer: TypedArray,
    box?: { sides?: number[] | number; center?: number[] },
  ): TypedArray;
  export function onRect(
    buffer: TypedArray,
    rect?: { sides?: number[] | number; center?: number[] },
  ): TypedArray;
  export function onCircle(
    buffer: TypedArray,
    circle?: { radius?: number; center?: number[] },
  ): TypedArray;
  export const noise: any;
  export class Generator {
    constructor(seed?: any);
    seed: any;
    next(): number;
  }
  export class FlashGen {
    constructor(options?: any);
  }
}
