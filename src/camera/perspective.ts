import { mat4 } from "gl-matrix";
import { Camera } from "./camera";

export class PerspectiveCamera extends Camera {
    private aspect: number;
    private fieldOfView: number;

    constructor(fieldOfView: number, aspect: number, zNear: number, zFar: number) {
        super(zNear, zFar);
        this.fieldOfView = fieldOfView;
        this.aspect = aspect;
        this.update();
    }

    private update(): void {
        mat4.perspective(this.projectionMatrix, this.fieldOfView, this.aspect, this.zNear, this.zFar);
    }
}
