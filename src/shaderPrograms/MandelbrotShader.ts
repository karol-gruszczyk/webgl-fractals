import * as fragmentShader from "!raw-loader!./shaders/mandelbrot.frag";
import * as vertexShader from "!raw-loader!./shaders/mandelbrot.vert";
import { mat4 } from "gl-matrix";
import { gl } from "../gl";
import { ShaderProgram } from "./ShaderProgram";

export class MandelbrotShader extends ShaderProgram {
    public vertexPositionLocation: number;
    public projectionMatrixLocation: number;
    public modelViewMatrixLocation: number;

    constructor() {
        super(vertexShader.default, fragmentShader.default);
        this.vertexPositionLocation = gl.getAttribLocation(this.program, "a_vertex_position");
        this.projectionMatrixLocation = gl.getUniformLocation(this.program, "u_projection_matrix") as number;
        this.modelViewMatrixLocation = gl.getUniformLocation(this.program, "u_model_view_matrix") as number;
    }

    public setProjectionMatrix(matrix: mat4): void {
        this.use();
        gl.uniformMatrix4fv(this.projectionMatrixLocation, false, matrix);
    }

    public setModelViewMatrix(matrix: mat4): void {
        this.use();
        gl.uniformMatrix4fv(this.modelViewMatrixLocation, false, matrix);
    }
}
