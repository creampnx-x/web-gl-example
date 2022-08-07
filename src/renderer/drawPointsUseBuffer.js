import {
    initShaders
} from "../initShader";
import {
    clearBackground
} from "./clearBackground";

/**
 *
 * @param {WebGLRenderingContext} gl
 * @param  {number} [drawType] 绘画的类型，默认为POINTS
 */
export const drawPointsUseBuffer = function (gl, drawType) {
    const pointShader = `
      attribute vec4 DynamicPosition;
      void main() {
          gl_Position = DynamicPosition;
          gl_PointSize = 10.0;
      }
    `;

    const fragmentShader = `
      void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `;

    if (!initShaders(gl, pointShader, fragmentShader))
        throw new Error("can not create program, please check your shader");

    const points = new Float32Array([0.5, 0.0, 0.0, 0.5, -0.5, 0.0]);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const location = gl.getAttribLocation(gl.program, "DynamicPosition");
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(location);
    
    clearBackground(gl);
    gl.drawArrays(drawType ?? gl.POINTS, 0, 3);
};