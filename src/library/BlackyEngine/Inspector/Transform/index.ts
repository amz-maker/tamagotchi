import Inspector from "../inspector";
import { InspectorType } from "../../enum";
import { Vector2 } from "../../module";

class Transform extends Inspector {
  public position: Vector2;
  public offset: Vector2;

  constructor() {
    super(InspectorType.TRANSFORM);
    this.position = new Vector2(0, 0);
    this.offset = new Vector2(0, 0);
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
  }

  public init() {}
}

export default Transform;
