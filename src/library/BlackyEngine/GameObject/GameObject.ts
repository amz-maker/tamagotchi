import { InspectorType } from "../enum";
import Inspector, { Transform } from "../Inspector";
import { IEvents } from "../interface";

abstract class GameObject {
  private inspectors: Inspector[];
  private name?: string;

  constructor() {
    this.inspectors = [];
    this.initBefore();
    this.init();
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

  public getInspector<T extends InspectorType>(
    type: T,
    name?: string
  ): T | undefined {
    const idx = this.inspectors.findIndex(
      (insp) => insp.getType() === type && insp.getName() === name
    );
    if (idx !== -1) {
      return this.inspectors[idx] as any;
    } else {
      return undefined;
    }
  }

  public getInspectors() {
    return this.inspectors;
  }

  private initBefore() {
    this.addInspector(new Transform());
  }
}

export default GameObject;
