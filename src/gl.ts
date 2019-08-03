export const gl: WebGLRenderingContext = (function initWebGL(): WebGLRenderingContext {
    const canvas = document.querySelector("#gl-canvas") as HTMLCanvasElement;

    if (canvas === null) {
        throw Error("Canvas element not found.");
    }
    const glCtx = canvas.getContext("webgl") as WebGLRenderingContext;

    if (glCtx === null) {
        throw Error("Unable to initialize WebGL. Your browser or machine may not support it.");
    }

    console.log(glCtx.getParameter(glCtx.VERSION));
    console.log(glCtx.getParameter(glCtx.SHADING_LANGUAGE_VERSION));
    console.log(glCtx.getParameter(glCtx.VENDOR));

    function onWindowResize(): void {
        canvas.width = glCtx.canvas.clientWidth;
        canvas.height = glCtx.canvas.clientHeight;
        glCtx.viewport(0, 0, glCtx.canvas.clientWidth, glCtx.canvas.clientHeight);
    }

    onWindowResize();
    window.addEventListener("resize", onWindowResize);

    return glCtx;
})();
