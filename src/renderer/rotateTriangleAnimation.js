import {
    initShaders
} from "../initShader";
import {
    clearBackground
} from "./clearBackground";
import { getArc } from "./utils";

/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
export const rotateTriangleAnimation = function (gl) {
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

    // 基础图形
    const points = new Float32Array([0.5, 0.0, 0.0, 0.5, -0.5, 0.0]);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const attributeLocation = gl.getAttribLocation(gl.program, "OriginPosition");
    const uniformLocation = gl.getUniformLocation(gl.program, "RotateMatrix");

    gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attributeLocation);

    const degreeStep = 15.0; 
    let lastTime = Date.now();
    let currentDegree = 0.0;

    function animate() {
        draw(getNextFrame());
        requestAnimationFrame(animate);
    }
    animate();

    function getNextFrame() {
        const now = Date.now();
        const delta = now - lastTime;
        lastTime = now;
        const degree = currentDegree + degreeStep * delta / 1000 ;
        currentDegree = degree;

        const {
            cosB,
            sinB
        } = getArc(degree);

        const rotateMatrix = new Float32Array([
            cosB, sinB, 0, 0,
            -sinB, cosB, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
        return rotateMatrix;
    }

    function draw(rotateMatrix) {
        gl.uniformMatrix4fv(uniformLocation, false, rotateMatrix);
        clearBackground(gl);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
};