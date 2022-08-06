import {
    initShaders
} from "../initShader";
import {
    convertClientToWebGLPosition
} from "../util";
import {
    clearBackground
} from "./clearBackground";

export const clickPoints = function (gl) {
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

    clearBackground(gl);

    document.onclick = e => {
        const pointLocation = gl.getAttribLocation(gl.program, "DynamicPosition");
        const point = convertClientToWebGLPosition(
            e.clientX,
            e.clientY,
            0.0,
            gl.canvas.getBoundingClientRect()
        );

        gl.vertexAttrib3f(pointLocation, point.x, point.y, point.z);

        clearBackground(gl);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}