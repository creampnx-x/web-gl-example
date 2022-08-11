import {
    initShaders
} from "../initShader";
import {
    clearBackground
} from "./clearBackground";

/**
 * 纹理贴图
 * 此处需要1:1且为 2 ** n 像素的图片
 * @param {WebGL2RenderingContext} gl 
 */
export const texture = function (gl) {
    const pointShader = `
        attribute vec4 pointsPosition;
        attribute vec2 pointsTexture;
        varying vec2 TextureCoord;
        void main() {
            gl_Position = pointsPosition;
            TextureCoord = pointsTexture;
        }
    `;

    const fragmentShader = `
        precision mediump float;
        varying vec2 TextureCoord;
        uniform sampler2D sampler;
        void main() {
            gl_FragColor = texture2D(sampler, TextureCoord);
        }
    `;

    if (!initShaders(gl, pointShader, fragmentShader))
        throw new Error("can not create program, please check your shader");

    clearBackground(gl);

    const n = setPointsPosition(gl);
    loadImage(gl, n, loadTexture);
};

/**
 * 设置点的位置
 * @param {WebGL2RenderingContext} gl 
 * @returns {number} 点位个数
 */
function setPointsPosition(gl) {
    const pointsMap = new Float32Array([
        -0.5,  0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5,   0.5, 1.0, 1.0,
        0.5,  -0.5, 1.0, 0.0,
    ]);
    const PER_ELEMENT_SIZE = pointsMap.BYTES_PER_ELEMENT;
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsMap, gl.STATIC_DRAW);

    const attributeLocation = gl.getAttribLocation(gl.program, "pointsPosition");
    gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, PER_ELEMENT_SIZE * 4, 0);
    gl.enableVertexAttribArray(attributeLocation);

    const textureLocation = gl.getAttribLocation(gl.program, "pointsTexture");
    gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, PER_ELEMENT_SIZE * 4, PER_ELEMENT_SIZE * 2);
    gl.enableVertexAttribArray(textureLocation);

    return 4;
}

/**
 * 异步加载图片
 * @param {WebGL2RenderingContext} gl 
 * @param {number} n
 * @param {Function} callback
 */
function loadImage(gl, n, callback) {
    const image = new Image();
    image.onload = () => callback(gl, n, image);
    image.src = "./texture-6.jpg";
}

/**
 * 加载纹理
 * @param {WebGLRenderingContext} gl 
 * @param {number} n
 * @param {Image} image
 */
function loadTexture(gl, n, image) {
    const texture = gl.createTexture();

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    const samplerLocation = gl.getUniformLocation(gl.program, "sampler");
    gl.uniform1i(samplerLocation, 0);

    clearBackground(gl);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}