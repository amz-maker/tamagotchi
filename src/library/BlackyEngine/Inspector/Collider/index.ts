import GameObject from "../../GameObject";
import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";
import { Size, Vector2 } from "../../common/module";

abstract class Collider extends Inspector {
  protected center: Vector2;
  protected isTrigger: boolean; // Trigger or Collision

  constructor(gameObject: GameObject, name: string) {
    super(gameObject, InspectorType.COLLIDER, name);

    this.center = new Vector2(0, 0);
    this.isTrigger = false;
    this.init();
  }

  public getCenter() {
    return this.center;
  }
  public setCenter(center: Vector2) {
    this.center = center;
    return this;
  }

  public getIsTrigger() {
    return this.isTrigger;
  }
  public setIsTrigger(isTrigger: boolean) {
    this.isTrigger = isTrigger;
    return this;
  }

  abstract collisionCheck(target: GameObject): boolean;

  public init() { }
  public update() {

  }
}



namespace Collider {
  export class SquareCollider extends Collider {
    private size: Vector2;

    constructor(gameObject: GameObject, name: string) {
      super(gameObject, name);
      this.size = new Vector2(0, 0);
    }

    public getSize() {
      return this.size;
    }
    public setSize(size: Vector2) {
      this.size = size;
      return this;
    }

    public collisionCheck(target: GameObject): boolean {
      const myTransform = this.getGameObject()?.getInspector(InspectorType.TRANSFORM);

      return true;
    }
  }

  // 미완성
  class CircleCollider extends Collider {
    private radius: number;

    constructor(gameObject: GameObject, name: string) {
      super(gameObject, name);
      this.radius = 0;
    }

    public collisionCheck(target: GameObject): boolean {
      return true;
    }
  }

  // 미완성
  class CapsuleCollider extends Collider {
    private radius: number;
    private height: number;
    private direction: 'Y' | 'X';

    constructor(gameObject: GameObject, name: string) {
      super(gameObject, name);
      this.radius = 0;
      this.height = 0;
      this.direction = 'Y';
    }

    public collisionCheck(target: GameObject): boolean {
      return true;
    }
  }
}

const SquareCollider = Collider.SquareCollider;

export { SquareCollider }
export default Collider;
