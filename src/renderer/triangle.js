import { drawPointsUseBuffer } from "./drawPointsUseBuffer";

/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
export const triangle = function(gl) {
    drawPointsUseBuffer(gl, gl.TRIANGLES);
};