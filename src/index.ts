import * as fragmentShader from "!raw-loader!./shaders/shader.frag";
import * as vertexShader from "!raw-loader!./shaders/shader.vert";
import { mat4 } from "gl-matrix";
import { PerspectiveCamera } from "./camera/perspective";
import { gl } from "./gl";
import { Rect } from "./rect";
import { ShaderProgram } from "./ShaderProgram";

class SimpleShader extends ShaderProgram {
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

const shaderProgram = new SimpleShader();
const rect = new Rect();
const camera = new PerspectiveCamera((45 * Math.PI) / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100.0);
camera.position = [-0.0, 0.0, -6.0];
shaderProgram.use();
shaderProgram.setModelViewMatrix(camera.modelViewMatrix);
shaderProgram.setProjectionMatrix(camera.projectionMatrix);

loop();

function loop(): void {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.vertexAttribPointer(shaderProgram.vertexPositionLocation, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(shaderProgram.vertexPositionLocation);

    rect.draw();

    setTimeout(loop, 50);
}
