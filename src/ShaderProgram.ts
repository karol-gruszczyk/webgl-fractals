import { gl } from "./gl";

export class ShaderProgram {
    private static loadShader(shaderType: GLenum, shaderSource: string): WebGLShader {
        const shader = gl.createShader(shaderType) as WebGLShader;

        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw Error(`Error while compiling shader: ${gl.getShaderInfoLog(shader)}\n${shaderSource}`);
        }

        return shader;
    }

    public program: WebGLProgram;

    constructor(vertexShaderSource: string, fragmentShaderSource: string) {
        this.program = gl.createProgram() as WebGLProgram;
        const vertexShader = ShaderProgram.loadShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = ShaderProgram.loadShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            throw Error(`Error while linking shader program: ${gl.getProgramInfoLog(this.program)}`);
        }
    }

    public use(): void {
        gl.useProgram(this.program);
    }
}
