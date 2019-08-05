import { vec2 } from "gl-matrix";
import { gl } from "./gl";
import { Rect } from "./rect";
import { MandelbrotShader } from "./shaderPrograms/MandelbrotShader";

let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
let cameraZoom = 1.0;
const position = vec2.create();

const shaderProgram = new MandelbrotShader();
shaderProgram.setAspect(aspect);
const rect = new Rect();

const keysDown = new Map<string, boolean>();

loop();

document.addEventListener("keydown", (event: KeyboardEvent) => {
    keysDown.set(event.key, true);
});

document.addEventListener("keyup", (event: KeyboardEvent) => {
    keysDown.set(event.key, false);
});
window.addEventListener("resize", () => {
    aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    shaderProgram.setAspect(aspect);
});

function translate(value: number[]): void {
    vec2.add(position, position, value);
    shaderProgram.setPosition(position);
}

function loop(): void {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT);

    if (keysDown.get("=")) {
        cameraZoom *= 1.05;
        shaderProgram.setZoom(cameraZoom);
    } else if (keysDown.get("-")) {
        cameraZoom *= 0.95;
        shaderProgram.setZoom(cameraZoom);
    }
    if (keysDown.get("ArrowUp")) {
        translate([0.0, 0.05 / cameraZoom]);
    } else if (keysDown.get("ArrowDown")) {
        translate([0.0, -0.05 / cameraZoom]);
    }
    if (keysDown.get("ArrowLeft")) {
        translate([-0.05 / cameraZoom, 0.0]);
    } else if (keysDown.get("ArrowRight")) {
        translate([0.05 / cameraZoom, 0.0]);
    }

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
