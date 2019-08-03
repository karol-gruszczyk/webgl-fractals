import { mat4, vec3 } from "gl-matrix";

export class Camera {
    public projectionMatrix: mat4 = mat4.create();
    public modelViewMatrix: mat4 = mat4.create();
    protected zFar: number;
    protected zNear: number;
    protected cameraPosition: vec3 = vec3.create();

    constructor(zNear: number, zFar: number) {
        this.zNear = zNear;
        this.zFar = zFar;
    }

    get position(): vec3 | number[] {
        return this.cameraPosition;
    }

    set position(value: vec3 | number[]) {
        vec3.copy(this.cameraPosition, value);
        mat4.identity(this.modelViewMatrix);
        mat4.translate(this.modelViewMatrix, this.modelViewMatrix, value);
    }

    public translate(value: vec3 | number[]): void {
        vec3.add(this.cameraPosition, this.cameraPosition, value);
        mat4.translate(this.modelViewMatrix, this.modelViewMatrix, value);
    }
}
