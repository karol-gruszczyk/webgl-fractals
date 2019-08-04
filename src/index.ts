import * as gradient from "!!raw-loader!./gradient.png";
import { mat4 } from "gl-matrix";
import { Key } from "ts-keycode-enum";
import { OrthographicCamera } from "./camera/orthographic";
import { PerspectiveCamera } from "./camera/perspective";
import { gl } from "./gl";
import { Rect } from "./rect";
import { MandelbrotShader } from "./shaderPrograms/MandelbrotShader";

const shaderProgram = new MandelbrotShader();
const rect = new Rect();
let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
const camera = new OrthographicCamera(-aspect, aspect, -1.0, 1.0, 0.0, 100.0);
let cameraZoom = 1.0;

const keysDown = new Map<string, boolean>();

loop();

document.addEventListener("keydown", (event: KeyboardEvent) => {
    console.log(event);
    keysDown.set(event.key, true);
});

document.addEventListener("keyup", (event: KeyboardEvent) => {
    console.log(event);
    keysDown.set(event.key, false);
});
window.addEventListener("resize", () => {
    aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    camera.set(-aspect, aspect, -1.0, 1.0);
});

function loop(): void {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (keysDown.get("=")) {
        cameraZoom *= 1.01;
        camera.setZoom(cameraZoom);
    } else if (keysDown.get("-")) {
        cameraZoom *= 0.99;
        camera.setZoom(cameraZoom);
    }
    if (keysDown.get("ArrowUp")) {
        camera.translate([0.0, -0.01 / cameraZoom, 0.0]);
    } else if (keysDown.get("ArrowDown")) {
        camera.translate([0.0, 0.01 / cameraZoom, 0.0]);
    }
    if (keysDown.get("ArrowLeft")) {
        camera.translate([0.01 / cameraZoom, 0.0, 0.0]);
    } else if (keysDown.get("ArrowRight")) {
        camera.translate([-0.01 / cameraZoom, 0.0, 0.0]);
    }

    shaderProgram.use();
    shaderProgram.setModelViewMatrix(camera.modelViewMatrix);
    shaderProgram.setProjectionMatrix(camera.projectionMatrix);

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
