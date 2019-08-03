export declare class ShaderProgram {
    program: WebGLProgram;
    private readonly vertexShaderPath;
    private readonly fragmentShaderPath;
    constructor(vertexShaderPath: string, fragmentShaderPath: string);
    init(): Promise<void>;
    private static loadShader;
}
