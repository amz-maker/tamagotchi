import GameObject from "../../GameObject";
import { InspectorType } from "../../enum";
import Inspector from "../inspector";

interface IFlip {
  x: boolean;
  y: boolean;
}
abstract class Renderer<
  TResource extends Renderer.Resource = Renderer.Resource
> extends Inspector {
  protected resource: TResource;
  protected flip: IFlip;

  constructor(resource: TResource) {
    super(InspectorType.RENDERER);

    this.resource = this.setResource(resource).getResource();
    this.flip = this.setFlip({
      x: false,
      y: false,
    }).getFlip();

    this.init();
  }

  public getResource() {
    return this.resource;
  }
  public setResource(resource: TResource) {
    const gObj = this.getGameObject();

    gObj !== undefined && resource.setGameObject(gObj);
    this.resource = resource;

    return this;
  }
  public getFlip() {
    return this.flip;
  }
  public setFlip(flip: IFlip) {
    this.flip = flip;
    return this;
  }

  public init() {}
  public render(ctx: CanvasRenderingContext2D): void {
    if (!!this.resource) {
      this.resource.render(ctx);
    }
  }
}

export class SpriteRenderer extends Renderer<Renderer.Resource.Sprite> {
  constructor(resource: Renderer.Resource.Sprite) {
    super(resource);
  }
}

namespace Renderer {
  export abstract class Resource<TObject = HTMLImageElement> {
    protected object: TObject;
    private gameObject?: GameObject;

    constructor(object: TObject) {
      this.object = object;
    }

    public getObject(): TObject {
      return this.object;
    }

    public setGameObject(gameObject: GameObject) {
      return (this.gameObject = gameObject);
    }
    public getGameObject() {
      return this.gameObject;
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
  }
  export namespace Resource {
    interface ILocation {
      row: number;
      column: number;
    }
    export class Sprite extends Renderer.Resource<HTMLImageElement> {
      public location: ILocation;

      constructor(
        image: HTMLImageElement,
        location: ILocation = {
          row: 0,
          column: 0,
        }
      ) {
        super(image);
        this.location = location;
      }
      public render(ctx: CanvasRenderingContext2D) {}
    }

    export class SimpleImage extends Renderer.Resource<HTMLImageElement> {
      constructor(src: string) {
        const img = new Image();
        img.src = src;
        super(img);
      }

      public render(ctx: CanvasRenderingContext2D) {}
    }
  }
}

export default Renderer;
