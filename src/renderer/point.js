import { initShaders } from "../initShader";
import { clearBackground } from "./clearBackground";

export const point = function(gl) {
    const pointShader = `
      void main() {
          gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
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

    gl.drawArrays(gl.POINTS, 0, 1);
}