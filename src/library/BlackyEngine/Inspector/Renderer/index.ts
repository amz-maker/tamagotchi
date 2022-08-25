import GameObject from "../../GameObject";
import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";
import { Blacky, Size } from "../../common/module";
import { Vector2 } from "../../common/module";

interface IFlip {
  x: boolean;
  y: boolean;
}
abstract class Renderer<
  TResource extends Renderer.Resource = Renderer.Resource
  > extends Inspector {
  protected resource?: TResource;
  protected flip: IFlip;

  constructor(gameObject: GameObject, resource?: TResource) {
    super(gameObject, InspectorType.RENDERER);

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
  public setResource(resource: TResource | undefined) {
    if (resource === undefined) return this;

    resource.setGameObject(this.getGameObject());
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

  public init() { }
  public render(ctx: CanvasRenderingContext2D): void {
    if (!!this.resource) {
      this.resource.render(ctx);
    }
  }
}

export class SpriteRenderer extends Renderer<Renderer.Resource.Sprite> {

  constructor(gameObject: GameObject, resource?: Renderer.Resource.Sprite) {
    super(gameObject, resource);
  }
}

namespace Renderer {
  export abstract class Resource<TObject = HTMLImageElement> extends Blacky {
    protected object?: TObject;

    constructor(object?: TObject) {
      super();
      this.object = this.setObject(object).getObject();
    }

    public getObject() {
      return this.object;
    }
    public setObject(object: TObject | undefined) {
      this.object = object;
      return this;
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
  }
  export namespace Resource {
    // Sprite
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
      public render(ctx: CanvasRenderingContext2D) {
        const transform = this.getGameObject()?.getInspector(InspectorType.TRANSFORM);
        const object = this.getObject();
        if (transform !== undefined && object !== undefined) {
          const op = transform.offsetPosition();
          const appliedScale = transform.applyScale(new Size(object.width, object.height));

          ctx.drawImage(object, op.getX(), op.getY(), appliedScale.getWidth(), appliedScale.getHeight());
        }
      }
    }
    // Simple Image
    export class SimpleImage extends Renderer.Resource<HTMLImageElement> {
      constructor(src: string) {
        const img = new Image();
        img.src = src;
        super(img);
      }

      public render(ctx: CanvasRenderingContext2D) { }
    }
  }
}

export default Renderer;
