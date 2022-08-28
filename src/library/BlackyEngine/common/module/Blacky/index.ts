import GameObject from "../../../GameObject";

abstract class Blacky {
    protected gameObject?: GameObject;

    public setGameObject(gameObject: GameObject | undefined) {
        this.gameObject = gameObject;
        return this;
    }
    public getGameObject() {
        return this.gameObject;
    }
}

export default Blacky;