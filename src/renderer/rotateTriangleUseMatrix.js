import {
    initShaders
} from "../initShader";

import {
    clearBackground
} from "./clearBackground";

/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
export const rotateTriangleUseMatrix = function (gl) {
    const pointShader = `
        attribute vec4 OriginPosition;
        uniform mat4 RotateMatrix;
        void main() {
            gl_Position = RotateMatrix * OriginPosition;
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

    const {cosB, sinB} = getArc(90);

    const rotateMatrix = new Float32Array([
        cosB, sinB, 0, 0,
        -sinB, cosB, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);

    const points = new Float32Array([0.5, 0.0, 0.0, 0.5, -0.5, 0.0]);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const attributeLocation = gl.getAttribLocation(gl.program, "OriginPosition");
    gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attributeLocation);

    const uniformLocation = gl.getUniformLocation(gl.program, "RotateMatrix");
    gl.uniformMatrix4fv(uniformLocation, false, rotateMatrix);
    
    gl.drawArrays(gl.TRIANGLES, 0, 3);
};

function getArc(degree) {
    const rad = degree * Math.PI / 180;
    return {
        sinB: Math.sin(rad),
        cosB: Math.cos(rad)
    };
}