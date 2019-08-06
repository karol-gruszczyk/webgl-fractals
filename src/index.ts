import { vec2 } from "gl-matrix";
import { gl } from "./gl";
import { Rect } from "./rect";
import { MandelbrotShader } from "./shaderPrograms/MandelbrotShader";

let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
let cameraZoom = 1.0;
const position = vec2.create();

const shaderProgram = new MandelbrotShader();
shaderProgram.setAspect(aspect);
updatePixelSize();
const rect = new Rect();

// TODO: create Renderer2D class
gl.vertexAttribPointer(shaderProgram.vertexPositionLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(shaderProgram.vertexPositionLocation);

const keysDown = new Map<string, boolean>();

render();
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
    updatePixelSize();
    render();
});

function translate(value: number[]): void {
    vec2.add(position, position, value);
    shaderProgram.setPosition(position);
}

function render(): void {
    gl.clear(gl.COLOR_BUFFER_BIT);

    rect.draw();
}

function updatePixelSize(): void {
    shaderProgram.setPixelSize([2.0 / gl.canvas.clientWidth / cameraZoom, 2.0 / gl.canvas.clientHeight / cameraZoom]);
}

function loop(): void {
    let rerender = false;

    if (keysDown.get("=")) {
        cameraZoom *= 1.05;
        shaderProgram.setZoom(cameraZoom);
        updatePixelSize();
        rerender = true;
    } else if (keysDown.get("-")) {
        cameraZoom *= 0.95;
        shaderProgram.setZoom(cameraZoom);
        updatePixelSize();
        rerender = true;
    }

    if (keysDown.get("ArrowUp")) {
        translate([0.0, 0.1 / cameraZoom]);
        rerender = true;
    } else if (keysDown.get("ArrowDown")) {
        translate([0.0, -0.1 / cameraZoom]);
        rerender = true;
    }

    if (keysDown.get("ArrowLeft")) {
        translate([-0.1 / cameraZoom, 0.0]);
        rerender = true;
    } else if (keysDown.get("ArrowRight")) {
        translate([0.1 / cameraZoom, 0.0]);
        rerender = true;
    }

    if (rerender) {
        render();
    }

    setTimeout(loop, 50);
}
