import GameObject from "../../GameObject";
import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";
import { Blacky, Size } from "../../common/module";
import { Vector2 } from "../../common/module";
import { Util } from "../../common/util";

interface IFlip {
  x?: boolean;
  y?: boolean;
}
abstract class Renderer<
  TResource extends Renderer.Resource = Renderer.Resource
> extends Inspector {
  protected resource?: TResource;

  constructor(gameObject: GameObject, resource?: TResource) {
    super(gameObject, InspectorType.RENDERER);

    this.resource = this.setResource(resource).getResource();

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

  public init() {}
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
    private object?: TObject;
    private flip: IFlip;

    constructor(object?: TObject) {
      super();
      this.object = this.setObject(object).getObject();
      this.flip = this.setFlip({
        x: false,
        y: false,
      }).getFlip();
    }

    public getObject() {
      return this.object;
    }
    public setObject(object: TObject | undefined) {
      this.object = object;
      return this;
    }

    public getFlip() {
      return this.flip;
    }
    public getVectorFlip() {
      const flip = this.getFlip();
      return new Vector2(flip.x ? -1 : 1, flip.y ? -1 : 1);
    }
    public setFlip(flip: IFlip) {
      const tempFlip = { ...this.getFlip(), ...flip };
      this.flip = tempFlip;
      return this;
    }

    abstract getSize(): Size;
    abstract render(ctx: CanvasRenderingContext2D): void;
  }
  export namespace Resource {
    // Sprite
    interface ISpritePosition {
      sx: number;
      sy: number;
      sw: number;
      sh: number;
    }
    export class Sprite extends Renderer.Resource<HTMLImageElement> {
      public spritePosition: ISpritePosition;

      constructor(
        image: HTMLImageElement,
        spritePosition: ISpritePosition = {
          sx: 0,
          sy: 0,
          sw: image.width,
          sh: image.height,
        }
      ) {
        super(image);
        this.spritePosition = spritePosition;
      }

      public getSize(): Size {
        const object = this.getObject();
        return new Size(object?.width ?? 0, object?.height ?? 0);
      }
      public setSize(size: Size) {
        const object = this.getObject();
        if (object !== undefined) {
          object.width = size.getWidth();
          object.height = size.getHeight();
        }
        return this;
      }

      public getSpritePosition() {
        return this.spritePosition;
      }
      public setSpritePosition(spritePosition: ISpritePosition) {
        this.spritePosition = spritePosition;
        return this;
      }

      public render(ctx: CanvasRenderingContext2D) {
        const object = this.getObject();
        const transform = this.getGameObject()?.getInspector(
          InspectorType.TRANSFORM
        );

        if (transform !== undefined && object !== undefined) {
          const position = transform.getPosition();
          const offset = transform.getOffset();
          const size = this.getSize();
          const spritePosition = this.getSpritePosition();
          const rScale = Util.Vector.multiply(
            transform.getScale(),
            this.getVectorFlip()
          );
          const unitScale = Util.Vector.toUnit(rScale);

          ctx.save();
          ctx.translate(
            size.getWidth() * offset.getX() * Math.abs(rScale.getX()),
            size.getHeight() * offset.getY() * Math.abs(rScale.getY())
          );
          ctx.scale(rScale.getX(), rScale.getY());
          ctx.drawImage(
            object,
            spritePosition.sx,
            spritePosition.sy,
            spritePosition.sw,
            spritePosition.sh,
            position.getX() / rScale.getX(),
            position.getY() / rScale.getY(),
            size.getWidth() * unitScale.getX(),
            size.getHeight() * unitScale.getY()
          );
          ctx.restore();
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

      public getSize(): Size {
        const object = this.getObject();
        return new Size(object?.width ?? 0, object?.height ?? 0);
      }
      public render(ctx: CanvasRenderingContext2D) {}
    }
  }
}

export default Renderer;
