import { IVector2 } from "../interface";

export class Vector2 {
  public position: IVector2;

  constructor(x: number, y: number) {
    this.position = {
      x,
      y,
    };
  }

  public getX() {
    return this.position.x;
  }
  public getY() {
    return this.position.y;
  }
  public getPosition() {
    return this.position;
  }
  public setX(x: number) {
    this.position.x = x;
  }
  public setY(y: number) {
    this.position.y = y;
  }
  public setPosition(position: IVector2) {
    this.position = position;
  }
}
