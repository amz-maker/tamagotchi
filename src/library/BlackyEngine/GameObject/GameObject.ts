import { InspectorType } from "../common/enum";
import Inspector, {
  Collider,
  Renderer,
  RigidBody,
  Script,
  Transform,
} from "../Inspector";
import { IEvents } from "../common/interface";

abstract class GameObject {
  private inspectors: Inspector[];
  private name?: string;

  constructor(
    options: {
      executeInit: boolean;
    } = {
        executeInit: true,
      }
  ) {
    this.inspectors = [];
    this.addInspector(new Transform(this));
    if (options.executeInit) {
      this.init();
    }
  }

  abstract init(): void;
  abstract event(event: IEvents): void;
  abstract update(): void;
  abstract render(ctx: CanvasRenderingContext2D): void;

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public addInspector(inspector: Inspector) {
    const insp = this.getInspector(inspector.getType(), inspector.getName());
    if (insp !== undefined) {
      console.log("This inspector is already exist - ", inspector.getType());
      return;
    }
    inspector.setGameObject(this);
    this.inspectors.push(inspector);
  }

  public removeInspector(type: InspectorType, name?: string) {
    const idx = this.inspectors.findIndex(
      (insp) => insp.getType() === type && insp.getName() === name
    );
    if (idx !== -1) {
      this.inspectors.splice(idx, 1);
    }
  }

  public getInspector(type: InspectorType.COLLIDER, name?: string): Collider | undefined;
  public getInspector(type: InspectorType.RENDERER, name?: string): Renderer | undefined;
  public getInspector(type: InspectorType.RIGID_BODY, name?: string): RigidBody | undefined;
  public getInspector(type: InspectorType.SCRIPT, name?: string): Script | undefined;
  public getInspector(type: InspectorType.TRANSFORM, name?: string): Transform | undefined;
  public getInspector(type: InspectorType, name?: string): Inspector | undefined;
  public getInspector(type: InspectorType, name?: string) {
    const idx = this.inspectors.findIndex(
      (insp) => insp.getType() === type && insp.getName() === name
    );
    if (idx !== -1) {
      return this.inspectors[idx];
    } else {
      return undefined;
    }
  }

  public getInspectors() {
    return this.inspectors;
  }
}

export default GameObject;
