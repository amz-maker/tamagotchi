import { ISize, IVector2 } from "../interface";
import GameObject from "../../GameObject";

export abstract class Blacky {
  protected gameObject?: GameObject;

  public setGameObject(gameObject: GameObject | undefined) {
    this.gameObject = gameObject;
    return this;
  }
  public getGameObject() {
    return this.gameObject;
  }
}
export class Vector2 {
  public value: IVector2;

  constructor(x: number, y: number) {
    this.value = {
      x,
      y,
    };
  }

  public getX() {
    return this.value.x;
  }
  public setX(x: number) {
    this.value.x = x;
    return this;
  }

  public getY() {
    return this.value.y;
  }
  public setY(y: number) {
    this.value.y = y;
    return this;
  }

  public getValue() {
    return this.value;
  }
  public setValue(value: IVector2) {
    this.value = value;
    return this;
  }
}

export const Vec2 = Vector2;

export class Size {
  public value: ISize;

  constructor(width: number, height: number) {
    this.value = {
      width,
      height,
    };
  }

  public getWidth() {
    return this.value.width;
  }
  public setWidth(width: number) {
    if (width < 0) {
      console.log("Width must be greater than 0");
      return this;
    }
    this.value.width = width;
    return this;
  }

  public getHeight() {
    return this.value.height;
  }
  public setHeight(height: number) {
    if (height < 0) {
      console.log("Height must be greater than 0");
      return this;
    }
    this.value.height = height;
    return this;
  }

  public getValue() {
    return this.value;
  }
  public setValue(value: ISize) {
    if (value.width < 0) {
      console.log("Width must be greater than 0");
      return this;
    }
    if (value.height < 0) {
      console.log("Height must be greater than 0");
      return this;
    }
    this.value = value;
    return this;
  }
}
