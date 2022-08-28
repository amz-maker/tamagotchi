import { ISize } from "../../interface";

class Size {
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

export default Size;