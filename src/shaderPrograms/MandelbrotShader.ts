import * as fragmentShader from "!raw-loader!./shaders/mandelbrot.frag";
import * as vertexShader from "!raw-loader!./shaders/mandelbrot.vert";
import { mat4, vec2 } from "gl-matrix";
import { gl } from "../gl";
import { ShaderProgram } from "./ShaderProgram";

export class MandelbrotShader extends ShaderProgram {
    public vertexPositionLocation: GLint;
    public aspectLocation: GLint;
    public zoomLocation: GLint;
    public positionLocation: GLint;
    public pixelSizeLocation: GLint;

    constructor() {
        super(vertexShader.default, fragmentShader.default);
        this.vertexPositionLocation = gl.getAttribLocation(this.program, "aVertexPosition");
        this.aspectLocation = gl.getUniformLocation(this.program, "uAspect") as GLint;
        this.zoomLocation = gl.getUniformLocation(this.program, "uZoom") as GLint;
        this.positionLocation = gl.getUniformLocation(this.program, "uCameraPosition") as GLint;
        this.pixelSizeLocation = gl.getUniformLocation(this.program, "uPixelSize") as GLint;
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

    public setPixelSize(value: vec2 | number[]): void {
        gl.uniform2fv(this.pixelSizeLocation, value);
    }
}
