import { Vector2 } from "../module";

namespace Util {
  export function loadedImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  }

  export namespace Vector {
    export function toUnit(vector: Vector2) {
      return new Vector2(
        vector.getX() / Math.abs(vector.getX()),
        vector.getY() / Math.abs(vector.getY())
      );
    }

    export function multiply(a: Vector2, b: Vector2) {
      return new Vector2(a.getX() * b.getX(), a.getY() * b.getY());
    }
  }

  export namespace Sort {
    export function quick<T>(arr: T[], getter: (element: T) => any): T[] {
      if (arr.length < 2) {
        return arr;
      }

      const pivot = [arr[0]];
      const left = [];
      const right = [];

      for (let i = 1; i < arr.length; i++) {
        if (getter(arr[i]) < getter(pivot[0])) {
          left.push(arr[i]);
        } else if (getter(arr[i]) > getter(pivot[0])) {
          right.push(arr[i]);
        } else {
          pivot.push(arr[i]);
        }
      }

      console.log(`left: ${left}, pivot: ${pivot}, right: ${right}`);
      return quick(left, getter).concat(pivot, quick(right, getter));
    }
  }
}

export { Util };
