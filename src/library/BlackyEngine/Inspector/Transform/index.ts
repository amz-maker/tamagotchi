import Inspector from "../inspector";
import { InspectorType } from "../../common/enum";
import { Size, Vector2 } from "../../common/module";
import GameObject from "../../GameObject";

class Transform extends Inspector {
  private position: Vector2;
  private offset: Vector2;
  private scale: Vector2;

  constructor(gameObject: GameObject) {
    super(gameObject, InspectorType.TRANSFORM);
    this.position = new Vector2(0, 0);
    this.offset = new Vector2(0, 0);
    this.scale = new Vector2(1, 1);
    this.init();
  }

  public getPosition() {
    return this.position;
  }

  public setPosition(): void;
  public setPosition(x: number, y: number): void;
  public setPosition(position: Vector2): void;
  public setPosition(a?: Vector2 | number, b?: number) {
    if (a === undefined && b === undefined) this.position = new Vector2(0, 0);
    else if (a !== undefined && b === undefined) this.position = a as Vector2;
    else this.position = new Vector2(a as number, b as number);

    return this;
  }

  public getOffset() {
    return this.offset;
  }
  public setOffset(offset: Vector2) {
    if (offset.getX() < -1 && 1 < offset.getX()) {
      console.log("Offset x is enable to -1~1");
      return this;
    }
    if (offset.getY() < -1 && 1 < offset.getY()) {
      console.log("Offset y is enable to -1~1");
      return this;
    }
    this.offset = offset;

    return this;
  }

  public getScale() {
    return this.scale;
  }

  public setScale(scale: Vector2) {
    this.scale = scale;

    return this;
  }

  // // Offset, Scale이 적용된 Position 반환
  // public getRealPosition(size: Size): Vector2 {
  //   const offset = this.getOffset();
  //   const scale = this.getScale();

  //   const realX =
  //     this.position.getX() - size.getWidth() * scale.getX() * offset.getX();
  //   const realY =
  //     this.position.getY() - size.getHeight() * scale.getY() * offset.getY();

  //   return new Vector2(realX, realY);
  // }

  // Scale 적용
  public getRealSize(size: Size) {
    const scale = this.getScale();
    return new Size(
      size.getWidth() * scale.getX(),
      size.getHeight() * scale.getY()
    );
  }

  public init() {}
}

export default Transform;
