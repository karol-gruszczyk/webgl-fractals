import { mat4 } from "gl-matrix";
import { Camera } from "./camera";

export class OrthographicCamera extends Camera {
    private left: number;
    private right: number;
    private bottom: number;
    private top: number;

    constructor(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number) {
        super(zNear, zFar);
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
        this.update();
    }

    public set(left: number, right: number, bottom: number, top: number): void {
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
        this.update();
    }

    private update(): void {
        mat4.ortho(this.projectionMatrix, this.left, this.right, this.bottom, this.top, this.zNear, this.zFar);
    }
}
