import * as fragmentShader from "!raw-loader!./shaders/mandelbrot.frag";
import * as vertexShader from "!raw-loader!./shaders/mandelbrot.vert";
import { mat4, vec2 } from "gl-matrix";
import { gl } from "../gl";
import { ShaderProgram } from "./ShaderProgram";

export class MandelbrotShader extends ShaderProgram {
    public vertexPositionLocation: number;
    public aspectLocation: number;
    public zoomLocation: number;
    public positionLocation: number;

    constructor() {
        super(vertexShader.default, fragmentShader.default);
        this.vertexPositionLocation = gl.getAttribLocation(this.program, "aVertexPosition");
        this.aspectLocation = gl.getUniformLocation(this.program, "uAspect") as number;
        this.zoomLocation = gl.getUniformLocation(this.program, "uZoom") as number;
        this.positionLocation = gl.getUniformLocation(this.program, "uCameraPosition") as number;
        this.use();
        this.setZoom(1.0);
        this.setAspect(1.0);
    }

    public setAspect(value: number): void {
        gl.uniform1f(this.aspectLocation, value);
    }

    public setZoom(value: number): void {
        gl.uniform1f(this.zoomLocation, value);
    }

    public setPosition(position: vec2): void {
        gl.uniform2fv(this.positionLocation, position);
    }
}
