precision highp float;

attribute vec4 aVertexPosition;

uniform float uAspect;
uniform float uZoom;
uniform vec2 uCameraPosition;

varying highp vec2 position;

void main() {
    position = 2.0 * vec2(aVertexPosition.x * uAspect, aVertexPosition.y) / uZoom + uCameraPosition;
    gl_Position = aVertexPosition;
}
