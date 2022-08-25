import { Blacky } from "../common/module";
import { InspectorType } from "../common/enum";
import { IEvents } from "../common/interface";
import GameObject from "../GameObject";

abstract class Inspector extends Blacky {
  private type: InspectorType;
  private name?: string;

  constructor(gameObject: GameObject, type: InspectorType, name?: string) {
    super();
    this.type = type;
    this.name = name;
    this.setGameObject(gameObject);
  }

  public getType() {
    return this.type;
  }
  public getName() {
    return this.name;
  }

  public init() { }
  public event(event: IEvents) { }
  public update() { }
  public render(ctx: CanvasRenderingContext2D) { }
}

export default Inspector;
