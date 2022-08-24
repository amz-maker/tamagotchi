import { InspectorType } from "../enum";
import { IEvents } from "../interface";
import GameObject from "../GameObject";

abstract class Inspector {
  private gameObject?: GameObject;
  private type: InspectorType;
  private name?: string;

  constructor(type: InspectorType, name?: string) {
    this.type = type;
    this.name = name;
  }

  public getType() {
    return this.type;
  }
  public getName() {
    return this.name;
  }

  public setGameObject(gameObject: GameObject) {
    return (this.gameObject = gameObject);
  }
  public getGameObject() {
    return this.gameObject;
  }

  public init() {}
  public event(event: IEvents) {}
  public update() {}
  public render(ctx: CanvasRenderingContext2D) {}
}

export default Inspector;
