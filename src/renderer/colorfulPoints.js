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
export const colorfulPoints = function (gl, drawType) {
    const pointShader = `
      attribute vec4 DynamicPosition;
      attribute vec4 DynamicColor;
      varying vec4 varyingColor;
      void main() {
          gl_Position = DynamicPosition;
          gl_PointSize = 10.0;
          varyingColor = DynamicColor;
      }
    `;

    const fragmentShader = `
      precision mediump float;
      varying vec4 varyingColor;
      void main() {
          gl_FragColor = varyingColor;
      }
    `;

    if (!initShaders(gl, pointShader, fragmentShader))
        throw new Error("can not create program, please check your shader");

    const points = new Float32Array([
        0.5, 0.0, 1.0, 0.0, 0.0,
        0.0, 0.5, 0.0, 1.0, 1.0,
        -0.5, 0.0, 0.0, 0.0, 1.0,
    ]);
    
    const perPointSize = points.BYTES_PER_ELEMENT;

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(gl.program, "DynamicPosition");
    const colorLocation = gl.getAttribLocation(gl.program, "DynamicColor");

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, perPointSize * 5, 0);
    gl.enableVertexAttribArray(positionLocation);

    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, perPointSize * 5, perPointSize * 2);
    gl.enableVertexAttribArray(colorLocation);

    clearBackground(gl);
    gl.drawArrays(drawType || gl.POINTS, 0, 3);
};