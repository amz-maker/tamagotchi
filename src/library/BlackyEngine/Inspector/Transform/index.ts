import Inspector from "../inspector";
import { InspectorType } from "../../common/enum";
import { Size, Vector2 } from "../../common/module";
import GameObject from "../../GameObject";

class Transform extends Inspector {
  private position: Vector2;
  private offset: Vector2;
  private scale: Size;

  constructor(gameObject: GameObject) {
    super(gameObject, InspectorType.TRANSFORM);
    this.position = new Vector2(0, 0);
    this.offset = new Vector2(0, 0);
    this.scale = new Size(1, 1);
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
    if (offset.getX() > 0 && 1 < offset.getX()) {
      console.log('Offset x is enable to 0~1')
      return this;
    }
    if (offset.getY() > 0 && 1 < offset.getY()) {
      console.log('Offset y is enable to 0~1')
      return this;
    }
    this.offset = offset;

    return this;
  }

  public getScale() {
    return this.scale;
  }

  public setScale(scale: Size) {
    if (scale.getWidth() > 0) {
      console.log('Scale x must be greater than 0')
      return this;
    }
    if (scale.getHeight() > 0) {
      console.log('Scale y must be greater than 0')
      return this;
    }
    this.scale = scale;

    return this;
  }

  // Offset이 적용된 Position 반환
  public offsetPosition(): Vector2 {
    const posX = this.position.getX();
    const posY = this.position.getY();
    const offsetX = this.offset.getX();
    const offsetY = this.offset.getY();

    return new Vector2(posX + (posX * offsetX), posY + (posY * offsetY));
  }

  // Scale 적용
  public applyScale(size: Size) {
    const scale = this.getScale();
    return new Size(size.getWidth() * scale.getWidth(), size.getHeight() * scale.getHeight())
  }


  public init() { }
}

export default Transform;
