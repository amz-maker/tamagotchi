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
}

export { Util };
