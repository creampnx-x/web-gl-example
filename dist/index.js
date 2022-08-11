"use strict";
(self["webpackChunkweb_gl_example"] = self["webpackChunkweb_gl_example"] || []).push([["index"],{

/***/ "./src/Example.js":
/*!************************!*\
  !*** ./src/Example.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Example": () => (/* binding */ Example)
/* harmony export */ });
/* harmony import */ var _renderer_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer/index */ "./src/renderer/index.js");

class Example {
    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     * @param {URLSearchParams} query 
     * @todo 将这个类改造成函数
     */
    constructor(gl, query) {
        this.gl = gl;
        this.whichExample = query.get("which") || "clearBackground";
    }

    render() {
        const render = _renderer_index__WEBPACK_IMPORTED_MODULE_0__["default"]?.[this.whichExample];
        if (!render) throw new Error(`can not find renderer for ${this.whichExample}`);
        render(this.gl); // fixed: 取消了this的关联性
    }
}

/***/ }),

/***/ "./src/constant.js":
/*!*************************!*\
  !*** ./src/constant.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CANVAS": () => (/* binding */ CANVAS)
/* harmony export */ });
const CANVAS = {
    width: 400,
    height: 400
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Example__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Example */ "./src/Example.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
 


function main() {
    const gl = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getWebGLContext)("canvas");

    if (!gl) throw new Error("can not create webgl context");
    
    const query = new URLSearchParams(location.search);
    const example = new _Example__WEBPACK_IMPORTED_MODULE_0__.Example(gl, query);
    example.render();
}

window.onerror = _util__WEBPACK_IMPORTED_MODULE_1__.showError;

main();

/***/ }),

/***/ "./src/initShader.js":
/*!***************************!*\
  !*** ./src/initShader.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initShaders": () => (/* binding */ initShaders)
/* harmony export */ });
/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current
 */
function initShaders(gl, vshader, fshader) {
    var program = createProgram(gl, vshader, fshader);
    if (!program) {
        console.log("无法创建程序对象 1");
        return false;
    }

    gl.useProgram(program);
    gl.program = program;

    return true;
}

/**
 * Create the linked program object
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
    // 创建着色器对象
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    if (!vertexShader || !fragmentShader) {
        return null;
    }

    // 创建程序对象
    var program = gl.createProgram();
    if (!program) {
        return null;
    }

    // 为程序对象分配顶点着色器和片元着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 连接着色器
    gl.linkProgram(program);

    // 检查连接
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        console.log("无法连接程序对象: 2 " + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}

/**
 * 创建着色器对象
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
    // 创建着色器对象
    var shader = gl.createShader(type);
    if (shader == null) {
        console.log("无法创建着色器 3");
        return null;
    }

    // 设置着色器源代码
    gl.shaderSource(shader, source);

    // 编译着色器
    gl.compileShader(shader);

    // 检查着色器的编译状态
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        console.log("Failed to compile shader: 4" + error);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

/***/ }),

/***/ "./src/renderer/clearBackground.js":
/*!*****************************************!*\
  !*** ./src/renderer/clearBackground.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearBackground": () => (/* binding */ clearBackground)
/* harmony export */ });
const clearBackground = (gl) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

/***/ }),

/***/ "./src/renderer/clickPoint.js":
/*!************************************!*\
  !*** ./src/renderer/clickPoint.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clickPoint": () => (/* binding */ clickPoint)
/* harmony export */ });
/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ "./src/initShader.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util.js");
/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clearBackground */ "./src/renderer/clearBackground.js");




const clickPoint = function (gl) {
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

    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))
        throw new Error("can not create program, please check your shader");

    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_2__.clearBackground)(gl);

    document.onclick = e => {
        const pointLocation = gl.getAttribLocation(gl.program, "DynamicPosition");
        const point = (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertClientToWebGLPosition)(
            e.clientX,
            e.clientY,
            0.0,
            gl.canvas.getBoundingClientRect()
        );

        gl.vertexAttrib3f(pointLocation, point.x, point.y, point.z);

        (0,_clearBackground__WEBPACK_IMPORTED_MODULE_2__.clearBackground)(gl);
        gl.drawArrays(gl.POINTS, 0, 1);
    };
};

/***/ }),

/***/ "./src/renderer/clickPoints.js":
/*!*************************************!*\
  !*** ./src/renderer/clickPoints.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clickPoints": () => (/* binding */ clickPoints)
/* harmony export */ });
/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ "./src/initShader.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util.js");
/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clearBackground */ "./src/renderer/clearBackground.js");




const clickPoints = function (gl) {
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

    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))
        throw new Error("can not create program, please check your shader");

    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_2__.clearBackground)(gl);

    const clickedPoints = [];

    document.onclick = (e) => {
        const pointLocation = gl.getAttribLocation(gl.program, "DynamicPosition");
        const point = (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertClientToWebGLPosition)(
            e.clientX,
            e.clientY,
            0.0,
            gl.canvas.getBoundingClientRect()
        );

        clickedPoints.push(point);
        (0,_clearBackground__WEBPACK_IMPORTED_MODULE_2__.clearBackground)(gl);
        for (let i=0; i<clickedPoints.length; i++) {
            gl.vertexAttrib3f(pointLocation, clickedPoints[i].x, clickedPoints[i].y, clickedPoints[i].z);
            gl.drawArrays(gl.POINTS, 0, 1);
        }
    };
};

/***/ }),

/***/ "./src/renderer/colorfulPoints.js":
/*!****************************************!*\
  !*** ./src/renderer/colorfulPoints.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "colorfulPoints": () => (/* binding */ colorfulPoints)
/* harmony export */ });
/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ "./src/initShader.js");
/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearBackground */ "./src/renderer/clearBackground.js");



/**
 *
 * @param {WebGLRenderingContext} gl
 * @param  {number} [drawType] 绘画的类型，默认为POINTS
 */
const colorfulPoints = function (gl, drawType) {
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

    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))
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

    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground)(gl);
    gl.drawArrays(drawType || gl.POINTS, 0, 3);
};

/***/ }),

/***/ "./src/renderer/colorfulTriangle.js":
/*!******************************************!*\
  !*** ./src/renderer/colorfulTriangle.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "colorfulTriangle": () => (/* binding */ colorfulTriangle)
/* harmony export */ });
/* harmony import */ var _colorfulPoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colorfulPoints */ "./src/renderer/colorfulPoints.js");


const colorfulTriangle = (gl) => {
    (0,_colorfulPoints__WEBPACK_IMPORTED_MODULE_0__.colorfulPoints)(gl, gl.TRIANGLES);
};

/***/ }),

/***/ "./src/renderer/drawPointsUseBuffer.js":
/*!*********************************************!*\
  !*** ./src/renderer/drawPointsUseBuffer.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "drawPointsUseBuffer": () => (/* binding */ drawPointsUseBuffer)
/* harmony export */ });
/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ "./src/initShader.js");
/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearBackground */ "./src/renderer/clearBackground.js");



/**
 *
 * @param {WebGLRenderingContext} gl
 * @param  {number} [drawType] 绘画的类型，默认为POINTS
 */
const drawPointsUseBuffer = function (gl, drawType) {
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

    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))
        throw new Error("can not create program, please check your shader");

    const points = new Float32Array([0.5, 0.0, 0.0, 0.5, -0.5, 0.0]);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const location = gl.getAttribLocation(gl.program, "DynamicPosition");
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(location);
    
    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground)(gl);
    gl.drawArrays(drawType ?? gl.POINTS, 0, 3);
};

/***/ }),

/***/ "./src/renderer/index.js":
/*!*******************************!*\
  !*** ./src/renderer/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./src/renderer/point.js");
/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearBackground */ "./src/renderer/clearBackground.js");
/* harmony import */ var _clickPoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clickPoint */ "./src/renderer/clickPoint.js");
/* harmony import */ var _clickPoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clickPoints */ "./src/renderer/clickPoints.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util */ "./src/util.js");
/* harmony import */ var _drawPointsUseBuffer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./drawPointsUseBuffer */ "./src/renderer/drawPointsUseBuffer.js");
/* harmony import */ var _triangle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./triangle */ "./src/renderer/triangle.js");
/* harmony import */ var _rotateTriangleUseMatrix__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rotateTriangleUseMatrix */ "./src/renderer/rotateTriangleUseMatrix.js");
/* harmony import */ var _rotateTriangleAnimation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rotateTriangleAnimation */ "./src/renderer/rotateTriangleAnimation.js");
/* harmony import */ var _colorfulPoints__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./colorfulPoints */ "./src/renderer/colorfulPoints.js");
/* harmony import */ var _colorfulTriangle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./colorfulTriangle */ "./src/renderer/colorfulTriangle.js");













const renderer = {
    clearBackground: _clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground,
    point: _point__WEBPACK_IMPORTED_MODULE_0__.point,
    clickPoint: _clickPoint__WEBPACK_IMPORTED_MODULE_2__.clickPoint,
    clickPoints: _clickPoints__WEBPACK_IMPORTED_MODULE_3__.clickPoints,
    drawPointsUseBuffer: _drawPointsUseBuffer__WEBPACK_IMPORTED_MODULE_5__.drawPointsUseBuffer,
    triangle: _triangle__WEBPACK_IMPORTED_MODULE_6__.triangle,
    rotateTriangleUseMatrix: _rotateTriangleUseMatrix__WEBPACK_IMPORTED_MODULE_7__.rotateTriangleUseMatrix,
    rotateTriangleAnimation: _rotateTriangleAnimation__WEBPACK_IMPORTED_MODULE_8__.rotateTriangleAnimation,
    colorfulPoints: _colorfulPoints__WEBPACK_IMPORTED_MODULE_9__.colorfulPoints,
    colorfulTriangle: _colorfulTriangle__WEBPACK_IMPORTED_MODULE_10__.colorfulTriangle,
};

const rendererList = Object.keys(renderer);
(0,_util__WEBPACK_IMPORTED_MODULE_4__.showRendererList)(rendererList);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderer);

/***/ }),

/***/ "./src/renderer/point.js":
/*!*******************************!*\
  !*** ./src/renderer/point.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "point": () => (/* binding */ point)
/* harmony export */ });
/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ "./src/initShader.js");
/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearBackground */ "./src/renderer/clearBackground.js");



const point = function(gl) {
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

    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))
        throw new Error("can not create program, please check your shader");

    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground)(gl);

    gl.drawArrays(gl.POINTS, 0, 1);
};

/***/ }),

/***/ "./src/renderer/rotateTriangleAnimation.js":
/*!*************************************************!*\
  !*** ./src/renderer/rotateTriangleAnimation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rotateTriangleAnimation": () => (/* binding */ rotateTriangleAnimation)
/* harmony export */ });
/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ "./src/initShader.js");
/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearBackground */ "./src/renderer/clearBackground.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/renderer/utils.js");




/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
const rotateTriangleAnimation = function (gl) {
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

    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))
        throw new Error("can not create program, please check your shader");

    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground)(gl);

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
        } = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getArc)(degree);

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
        (0,_clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground)(gl);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
};

/***/ }),

/***/ "./src/renderer/rotateTriangleUseMatrix.js":
/*!*************************************************!*\
  !*** ./src/renderer/rotateTriangleUseMatrix.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rotateTriangleUseMatrix": () => (/* binding */ rotateTriangleUseMatrix)
/* harmony export */ });
/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ "./src/initShader.js");
/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearBackground */ "./src/renderer/clearBackground.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/renderer/utils.js");




/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
const rotateTriangleUseMatrix = function (gl) {
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

    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))
        throw new Error("can not create program, please check your shader");

    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground)(gl);

    const {cosB, sinB} = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getArc)(90);

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

/***/ }),

/***/ "./src/renderer/triangle.js":
/*!**********************************!*\
  !*** ./src/renderer/triangle.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "triangle": () => (/* binding */ triangle)
/* harmony export */ });
/* harmony import */ var _drawPointsUseBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawPointsUseBuffer */ "./src/renderer/drawPointsUseBuffer.js");


/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
const triangle = function(gl) {
    (0,_drawPointsUseBuffer__WEBPACK_IMPORTED_MODULE_0__.drawPointsUseBuffer)(gl, gl.TRIANGLES);
};

/***/ }),

/***/ "./src/renderer/utils.js":
/*!*******************************!*\
  !*** ./src/renderer/utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getArc": () => (/* binding */ getArc)
/* harmony export */ });
/**
 * `Math.sin/cos` use radians, but we use degrees. 
 * The function can caculate the sin/cos of degrees.
 * @param {number} degree
 * @returns sin(degree), cos(degree)
 */
function getArc(degree) {
    const rad = degree * Math.PI / 180;
    return {
        sinB: Math.sin(rad),
        cosB: Math.cos(rad)
    };
}

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertClientToWebGLPosition": () => (/* binding */ convertClientToWebGLPosition),
/* harmony export */   "getWebGLContext": () => (/* binding */ getWebGLContext),
/* harmony export */   "showError": () => (/* binding */ showError),
/* harmony export */   "showRendererList": () => (/* binding */ showRendererList)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/constant.js");


function showError(message) {
    console.error(message);
    const errorDiv = document.getElementById("show-error");

    errorDiv.innerHTML = message;
    errorDiv.style.color = "red";
}

function showRendererList(list) {
    const rendererList = document.getElementById("renderer-list");
    rendererList.innerHTML = "";
    for (const renderer of list) {
        const li = document.createElement("li");
        const href = location.href.split("?")[0] + "?which=" + renderer;
        li.innerHTML = `<a href="${href}"> ${renderer} </a>`;
        rendererList.appendChild(li);
    }
}

function getWebGLContext(elementID) {
    const canvas = document.getElementById(elementID);
    const gl = canvas.getContext("webgl"); // todo: 在这里更新Canvas的大小，考虑副作用
    return gl;
}

function convertClientToWebGLPosition(clientX, clientY, z, rect) {
    let x = ((clientX - rect.left) - _constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS.height / 2) / (_constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS.height / 2);
    let y = -((clientY - rect.top) - _constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS.width / 2) / (_constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS.width / 2);
    return {
        x,
        y,
        z
    };
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsS0FBSyxLQUFLLFVBQVU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNPO0FBQ1AscUNBQXFDLG9EQUFhLFNBQVMsb0RBQWE7QUFDeEUscUNBQXFDLG1EQUFZLFNBQVMsbURBQVk7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViLWdsLWV4YW1wbGUvLi9zcmMvRXhhbXBsZS5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9pbml0U2hhZGVyLmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL2NsZWFyQmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci9jbGlja1BvaW50LmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL2NsaWNrUG9pbnRzLmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL2NvbG9yZnVsUG9pbnRzLmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL2NvbG9yZnVsVHJpYW5nbGUuanMiLCJ3ZWJwYWNrOi8vd2ViLWdsLWV4YW1wbGUvLi9zcmMvcmVuZGVyZXIvZHJhd1BvaW50c1VzZUJ1ZmZlci5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci9wb2ludC5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci9yb3RhdGVUcmlhbmdsZUFuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci9yb3RhdGVUcmlhbmdsZVVzZU1hdHJpeC5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci90cmlhbmdsZS5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci91dGlscy5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy91dGlsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZW5kZXJlciBmcm9tIFwiLi9yZW5kZXJlci9pbmRleFwiO1xyXG5leHBvcnQgY2xhc3MgRXhhbXBsZSB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtXZWJHTDJSZW5kZXJpbmdDb250ZXh0fSBnbCBcclxuICAgICAqIEBwYXJhbSB7VVJMU2VhcmNoUGFyYW1zfSBxdWVyeSBcclxuICAgICAqIEB0b2RvIOWwhui/meS4quexu+aUuemAoOaIkOWHveaVsFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihnbCwgcXVlcnkpIHtcclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICAgICAgdGhpcy53aGljaEV4YW1wbGUgPSBxdWVyeS5nZXQoXCJ3aGljaFwiKSB8fCBcImNsZWFyQmFja2dyb3VuZFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCByZW5kZXIgPSByZW5kZXJlcj8uW3RoaXMud2hpY2hFeGFtcGxlXTtcclxuICAgICAgICBpZiAoIXJlbmRlcikgdGhyb3cgbmV3IEVycm9yKGBjYW4gbm90IGZpbmQgcmVuZGVyZXIgZm9yICR7dGhpcy53aGljaEV4YW1wbGV9YCk7XHJcbiAgICAgICAgcmVuZGVyKHRoaXMuZ2wpOyAvLyBmaXhlZDog5Y+W5raI5LqGdGhpc+eahOWFs+iBlOaAp1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IENBTlZBUyA9IHtcclxuICAgIHdpZHRoOiA0MDAsXHJcbiAgICBoZWlnaHQ6IDQwMFxyXG59OyIsImltcG9ydCB7IEV4YW1wbGUgfSBmcm9tIFwiLi9FeGFtcGxlXCI7IFxyXG5pbXBvcnQgeyBzaG93RXJyb3IsIGdldFdlYkdMQ29udGV4dCB9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgICBjb25zdCBnbCA9IGdldFdlYkdMQ29udGV4dChcImNhbnZhc1wiKTtcclxuXHJcbiAgICBpZiAoIWdsKSB0aHJvdyBuZXcgRXJyb3IoXCJjYW4gbm90IGNyZWF0ZSB3ZWJnbCBjb250ZXh0XCIpO1xyXG4gICAgXHJcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKTtcclxuICAgIGNvbnN0IGV4YW1wbGUgPSBuZXcgRXhhbXBsZShnbCwgcXVlcnkpO1xyXG4gICAgZXhhbXBsZS5yZW5kZXIoKTtcclxufVxyXG5cclxud2luZG93Lm9uZXJyb3IgPSBzaG93RXJyb3I7XHJcblxyXG5tYWluKCk7IiwiLyoqXHJcbiAqIENyZWF0ZSBhIHByb2dyYW0gb2JqZWN0IGFuZCBtYWtlIGN1cnJlbnRcclxuICogQHBhcmFtIGdsIEdMIGNvbnRleHRcclxuICogQHBhcmFtIHZzaGFkZXIgYSB2ZXJ0ZXggc2hhZGVyIHByb2dyYW0gKHN0cmluZylcclxuICogQHBhcmFtIGZzaGFkZXIgYSBmcmFnbWVudCBzaGFkZXIgcHJvZ3JhbSAoc3RyaW5nKVxyXG4gKiBAcmV0dXJuIHRydWUsIGlmIHRoZSBwcm9ncmFtIG9iamVjdCB3YXMgY3JlYXRlZCBhbmQgc3VjY2Vzc2Z1bGx5IG1hZGUgY3VycmVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTaGFkZXJzKGdsLCB2c2hhZGVyLCBmc2hhZGVyKSB7XHJcbiAgICB2YXIgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0oZ2wsIHZzaGFkZXIsIGZzaGFkZXIpO1xyXG4gICAgaWYgKCFwcm9ncmFtKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLml6Dms5XliJvlu7rnqIvluo/lr7nosaEgMVwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcclxuICAgIGdsLnByb2dyYW0gPSBwcm9ncmFtO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHRoZSBsaW5rZWQgcHJvZ3JhbSBvYmplY3RcclxuICogQHBhcmFtIGdsIEdMIGNvbnRleHRcclxuICogQHBhcmFtIHZzaGFkZXIgYSB2ZXJ0ZXggc2hhZGVyIHByb2dyYW0gKHN0cmluZylcclxuICogQHBhcmFtIGZzaGFkZXIgYSBmcmFnbWVudCBzaGFkZXIgcHJvZ3JhbSAoc3RyaW5nKVxyXG4gKiBAcmV0dXJuIGNyZWF0ZWQgcHJvZ3JhbSBvYmplY3QsIG9yIG51bGwgaWYgdGhlIGNyZWF0aW9uIGhhcyBmYWlsZWRcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oZ2wsIHZzaGFkZXIsIGZzaGFkZXIpIHtcclxuICAgIC8vIOWIm+W7uuedgOiJsuWZqOWvueixoVxyXG4gICAgdmFyIHZlcnRleFNoYWRlciA9IGxvYWRTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZzaGFkZXIpO1xyXG4gICAgdmFyIGZyYWdtZW50U2hhZGVyID0gbG9hZFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmc2hhZGVyKTtcclxuICAgIGlmICghdmVydGV4U2hhZGVyIHx8ICFmcmFnbWVudFNoYWRlcikge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIm+W7uueoi+W6j+WvueixoVxyXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICBpZiAoIXByb2dyYW0pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuLrnqIvluo/lr7nosaHliIbphY3pobbngrnnnYDoibLlmajlkozniYflhYPnnYDoibLlmahcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcclxuXHJcbiAgICAvLyDov57mjqXnnYDoibLlmahcclxuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xyXG5cclxuICAgIC8vIOajgOafpei/nuaOpVxyXG4gICAgdmFyIGxpbmtlZCA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xyXG4gICAgaWYgKCFsaW5rZWQpIHtcclxuICAgICAgICB2YXIgZXJyb3IgPSBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuaXoOazlei/nuaOpeeoi+W6j+WvueixoTogMiBcIiArIGVycm9yKTtcclxuICAgICAgICBnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xyXG4gICAgICAgIGdsLmRlbGV0ZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XHJcbiAgICAgICAgZ2wuZGVsZXRlU2hhZGVyKHZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJvZ3JhbTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWIm+W7uuedgOiJsuWZqOWvueixoVxyXG4gKiBAcGFyYW0gZ2wgR0wgY29udGV4dFxyXG4gKiBAcGFyYW0gdHlwZSB0aGUgdHlwZSBvZiB0aGUgc2hhZGVyIG9iamVjdCB0byBiZSBjcmVhdGVkXHJcbiAqIEBwYXJhbSBzb3VyY2Ugc2hhZGVyIHByb2dyYW0gKHN0cmluZylcclxuICogQHJldHVybiBjcmVhdGVkIHNoYWRlciBvYmplY3QsIG9yIG51bGwgaWYgdGhlIGNyZWF0aW9uIGhhcyBmYWlsZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkU2hhZGVyKGdsLCB0eXBlLCBzb3VyY2UpIHtcclxuICAgIC8vIOWIm+W7uuedgOiJsuWZqOWvueixoVxyXG4gICAgdmFyIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcclxuICAgIGlmIChzaGFkZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5peg5rOV5Yib5bu6552A6Imy5ZmoIDNcIik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+572u552A6Imy5Zmo5rqQ5Luj56CBXHJcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xyXG5cclxuICAgIC8vIOe8luivkeedgOiJsuWZqFxyXG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG5cclxuICAgIC8vIOajgOafpeedgOiJsuWZqOeahOe8luivkeeKtuaAgVxyXG4gICAgdmFyIGNvbXBpbGVkID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpO1xyXG4gICAgaWYgKCFjb21waWxlZCkge1xyXG4gICAgICAgIHZhciBlcnJvciA9IGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBjb21waWxlIHNoYWRlcjogNFwiICsgZXJyb3IpO1xyXG4gICAgICAgIGdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzaGFkZXI7XHJcbn0iLCJleHBvcnQgY29uc3QgY2xlYXJCYWNrZ3JvdW5kID0gKGdsKSA9PiB7XHJcbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcclxufTsiLCJpbXBvcnQgeyBpbml0U2hhZGVycyB9IGZyb20gXCIuLi9pbml0U2hhZGVyXCI7XHJcbmltcG9ydCB7IGNvbnZlcnRDbGllbnRUb1dlYkdMUG9zaXRpb24gfSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQgeyBjbGVhckJhY2tncm91bmQgfSBmcm9tIFwiLi9jbGVhckJhY2tncm91bmRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBjbGlja1BvaW50ID0gZnVuY3Rpb24gKGdsKSB7XHJcbiAgICBjb25zdCBwb2ludFNoYWRlciA9IGBcclxuICAgICAgYXR0cmlidXRlIHZlYzQgRHluYW1pY1Bvc2l0aW9uO1xyXG4gICAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgICBnbF9Qb3NpdGlvbiA9IER5bmFtaWNQb3NpdGlvbjtcclxuICAgICAgICAgIGdsX1BvaW50U2l6ZSA9IDEwLjA7XHJcbiAgICAgIH1cclxuICAgIGA7XHJcblxyXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBgXHJcbiAgICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBpZiAoIWluaXRTaGFkZXJzKGdsLCBwb2ludFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgY3JlYXRlIHByb2dyYW0sIHBsZWFzZSBjaGVjayB5b3VyIHNoYWRlclwiKTtcclxuXHJcbiAgICBjbGVhckJhY2tncm91bmQoZ2wpO1xyXG5cclxuICAgIGRvY3VtZW50Lm9uY2xpY2sgPSBlID0+IHtcclxuICAgICAgICBjb25zdCBwb2ludExvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oZ2wucHJvZ3JhbSwgXCJEeW5hbWljUG9zaXRpb25cIik7XHJcbiAgICAgICAgY29uc3QgcG9pbnQgPSBjb252ZXJ0Q2xpZW50VG9XZWJHTFBvc2l0aW9uKFxyXG4gICAgICAgICAgICBlLmNsaWVudFgsXHJcbiAgICAgICAgICAgIGUuY2xpZW50WSxcclxuICAgICAgICAgICAgMC4wLFxyXG4gICAgICAgICAgICBnbC5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWIzZihwb2ludExvY2F0aW9uLCBwb2ludC54LCBwb2ludC55LCBwb2ludC56KTtcclxuXHJcbiAgICAgICAgY2xlYXJCYWNrZ3JvdW5kKGdsKTtcclxuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlBPSU5UUywgMCwgMSk7XHJcbiAgICB9O1xyXG59OyIsImltcG9ydCB7XHJcbiAgICBpbml0U2hhZGVyc1xyXG59IGZyb20gXCIuLi9pbml0U2hhZGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBjb252ZXJ0Q2xpZW50VG9XZWJHTFBvc2l0aW9uXHJcbn0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHtcclxuICAgIGNsZWFyQmFja2dyb3VuZFxyXG59IGZyb20gXCIuL2NsZWFyQmFja2dyb3VuZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNsaWNrUG9pbnRzID0gZnVuY3Rpb24gKGdsKSB7XHJcbiAgICBjb25zdCBwb2ludFNoYWRlciA9IGBcclxuICAgIGF0dHJpYnV0ZSB2ZWM0IER5bmFtaWNQb3NpdGlvbjtcclxuICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICBnbF9Qb3NpdGlvbiA9IER5bmFtaWNQb3NpdGlvbjtcclxuICAgICAgICBnbF9Qb2ludFNpemUgPSAxMC4wO1xyXG4gICAgfVxyXG4gIGA7XHJcblxyXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBgXHJcbiAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLjAsIDAuMCwgMC4wLCAxLjApO1xyXG4gICAgfVxyXG4gIGA7XHJcblxyXG4gICAgaWYgKCFpbml0U2hhZGVycyhnbCwgcG9pbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyKSlcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4gbm90IGNyZWF0ZSBwcm9ncmFtLCBwbGVhc2UgY2hlY2sgeW91ciBzaGFkZXJcIik7XHJcblxyXG4gICAgY2xlYXJCYWNrZ3JvdW5kKGdsKTtcclxuXHJcbiAgICBjb25zdCBjbGlja2VkUG9pbnRzID0gW107XHJcblxyXG4gICAgZG9jdW1lbnQub25jbGljayA9IChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9pbnRMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKGdsLnByb2dyYW0sIFwiRHluYW1pY1Bvc2l0aW9uXCIpO1xyXG4gICAgICAgIGNvbnN0IHBvaW50ID0gY29udmVydENsaWVudFRvV2ViR0xQb3NpdGlvbihcclxuICAgICAgICAgICAgZS5jbGllbnRYLFxyXG4gICAgICAgICAgICBlLmNsaWVudFksXHJcbiAgICAgICAgICAgIDAuMCxcclxuICAgICAgICAgICAgZ2wuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY2xpY2tlZFBvaW50cy5wdXNoKHBvaW50KTtcclxuICAgICAgICBjbGVhckJhY2tncm91bmQoZ2wpO1xyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTxjbGlja2VkUG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGdsLnZlcnRleEF0dHJpYjNmKHBvaW50TG9jYXRpb24sIGNsaWNrZWRQb2ludHNbaV0ueCwgY2xpY2tlZFBvaW50c1tpXS55LCBjbGlja2VkUG9pbnRzW2ldLnopO1xyXG4gICAgICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlBPSU5UUywgMCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTsiLCJpbXBvcnQge1xyXG4gICAgaW5pdFNoYWRlcnNcclxufSBmcm9tIFwiLi4vaW5pdFNoYWRlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgY2xlYXJCYWNrZ3JvdW5kXHJcbn0gZnJvbSBcIi4vY2xlYXJCYWNrZ3JvdW5kXCI7XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEBwYXJhbSAge251bWJlcn0gW2RyYXdUeXBlXSDnu5jnlLvnmoTnsbvlnovvvIzpu5jorqTkuLpQT0lOVFNcclxuICovXHJcbmV4cG9ydCBjb25zdCBjb2xvcmZ1bFBvaW50cyA9IGZ1bmN0aW9uIChnbCwgZHJhd1R5cGUpIHtcclxuICAgIGNvbnN0IHBvaW50U2hhZGVyID0gYFxyXG4gICAgICBhdHRyaWJ1dGUgdmVjNCBEeW5hbWljUG9zaXRpb247XHJcbiAgICAgIGF0dHJpYnV0ZSB2ZWM0IER5bmFtaWNDb2xvcjtcclxuICAgICAgdmFyeWluZyB2ZWM0IHZhcnlpbmdDb2xvcjtcclxuICAgICAgdm9pZCBtYWluKCkge1xyXG4gICAgICAgICAgZ2xfUG9zaXRpb24gPSBEeW5hbWljUG9zaXRpb247XHJcbiAgICAgICAgICBnbF9Qb2ludFNpemUgPSAxMC4wO1xyXG4gICAgICAgICAgdmFyeWluZ0NvbG9yID0gRHluYW1pY0NvbG9yO1xyXG4gICAgICB9XHJcbiAgICBgO1xyXG5cclxuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gYFxyXG4gICAgICBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuICAgICAgdmFyeWluZyB2ZWM0IHZhcnlpbmdDb2xvcjtcclxuICAgICAgdm9pZCBtYWluKCkge1xyXG4gICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmFyeWluZ0NvbG9yO1xyXG4gICAgICB9XHJcbiAgICBgO1xyXG5cclxuICAgIGlmICghaW5pdFNoYWRlcnMoZ2wsIHBvaW50U2hhZGVyLCBmcmFnbWVudFNoYWRlcikpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBjcmVhdGUgcHJvZ3JhbSwgcGxlYXNlIGNoZWNrIHlvdXIgc2hhZGVyXCIpO1xyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgICAgIDAuNSwgMC4wLCAxLjAsIDAuMCwgMC4wLFxyXG4gICAgICAgIDAuMCwgMC41LCAwLjAsIDEuMCwgMS4wLFxyXG4gICAgICAgIC0wLjUsIDAuMCwgMC4wLCAwLjAsIDEuMCxcclxuICAgIF0pO1xyXG4gICAgXHJcbiAgICBjb25zdCBwZXJQb2ludFNpemUgPSBwb2ludHMuQllURVNfUEVSX0VMRU1FTlQ7XHJcblxyXG4gICAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgcG9pbnRzLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgY29uc3QgcG9zaXRpb25Mb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKGdsLnByb2dyYW0sIFwiRHluYW1pY1Bvc2l0aW9uXCIpO1xyXG4gICAgY29uc3QgY29sb3JMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKGdsLnByb2dyYW0sIFwiRHluYW1pY0NvbG9yXCIpO1xyXG5cclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zaXRpb25Mb2NhdGlvbiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCBwZXJQb2ludFNpemUgKiA1LCAwKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uTG9jYXRpb24pO1xyXG5cclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoY29sb3JMb2NhdGlvbiwgMywgZ2wuRkxPQVQsIGZhbHNlLCBwZXJQb2ludFNpemUgKiA1LCBwZXJQb2ludFNpemUgKiAyKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGNvbG9yTG9jYXRpb24pO1xyXG5cclxuICAgIGNsZWFyQmFja2dyb3VuZChnbCk7XHJcbiAgICBnbC5kcmF3QXJyYXlzKGRyYXdUeXBlIHx8IGdsLlBPSU5UUywgMCwgMyk7XHJcbn07IiwiaW1wb3J0IHsgY29sb3JmdWxQb2ludHMgfSBmcm9tIFwiLi9jb2xvcmZ1bFBvaW50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbG9yZnVsVHJpYW5nbGUgPSAoZ2wpID0+IHtcclxuICAgIGNvbG9yZnVsUG9pbnRzKGdsLCBnbC5UUklBTkdMRVMpO1xyXG59OyIsImltcG9ydCB7XHJcbiAgICBpbml0U2hhZGVyc1xyXG59IGZyb20gXCIuLi9pbml0U2hhZGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBjbGVhckJhY2tncm91bmRcclxufSBmcm9tIFwiLi9jbGVhckJhY2tncm91bmRcIjtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtICB7bnVtYmVyfSBbZHJhd1R5cGVdIOe7mOeUu+eahOexu+Wei++8jOm7mOiupOS4ulBPSU5UU1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRyYXdQb2ludHNVc2VCdWZmZXIgPSBmdW5jdGlvbiAoZ2wsIGRyYXdUeXBlKSB7XHJcbiAgICBjb25zdCBwb2ludFNoYWRlciA9IGBcclxuICAgICAgYXR0cmlidXRlIHZlYzQgRHluYW1pY1Bvc2l0aW9uO1xyXG4gICAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgICBnbF9Qb3NpdGlvbiA9IER5bmFtaWNQb3NpdGlvbjtcclxuICAgICAgICAgIGdsX1BvaW50U2l6ZSA9IDEwLjA7XHJcbiAgICAgIH1cclxuICAgIGA7XHJcblxyXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBgXHJcbiAgICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBpZiAoIWluaXRTaGFkZXJzKGdsLCBwb2ludFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgY3JlYXRlIHByb2dyYW0sIHBsZWFzZSBjaGVjayB5b3VyIHNoYWRlclwiKTtcclxuXHJcbiAgICBjb25zdCBwb2ludHMgPSBuZXcgRmxvYXQzMkFycmF5KFswLjUsIDAuMCwgMC4wLCAwLjUsIC0wLjUsIDAuMF0pO1xyXG4gICAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgcG9pbnRzLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgY29uc3QgbG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihnbC5wcm9ncmFtLCBcIkR5bmFtaWNQb3NpdGlvblwiKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbik7XHJcbiAgICBcclxuICAgIGNsZWFyQmFja2dyb3VuZChnbCk7XHJcbiAgICBnbC5kcmF3QXJyYXlzKGRyYXdUeXBlID8/IGdsLlBPSU5UUywgMCwgMyk7XHJcbn07IiwiaW1wb3J0IHsgcG9pbnQgfSBmcm9tIFwiLi9wb2ludFwiO1xyXG5pbXBvcnQgeyBjbGVhckJhY2tncm91bmQgfSBmcm9tIFwiLi9jbGVhckJhY2tncm91bmRcIjtcclxuaW1wb3J0IHsgY2xpY2tQb2ludCB9IGZyb20gXCIuL2NsaWNrUG9pbnRcIjtcclxuaW1wb3J0IHsgY2xpY2tQb2ludHMgfSBmcm9tIFwiLi9jbGlja1BvaW50c1wiO1xyXG5pbXBvcnQgeyBzaG93UmVuZGVyZXJMaXN0IH0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHsgZHJhd1BvaW50c1VzZUJ1ZmZlciB9IGZyb20gXCIuL2RyYXdQb2ludHNVc2VCdWZmZXJcIjtcclxuaW1wb3J0IHsgdHJpYW5nbGUgfSBmcm9tIFwiLi90cmlhbmdsZVwiO1xyXG5pbXBvcnQgeyByb3RhdGVUcmlhbmdsZVVzZU1hdHJpeCB9IGZyb20gXCIuL3JvdGF0ZVRyaWFuZ2xlVXNlTWF0cml4XCI7XHJcbmltcG9ydCB7IHJvdGF0ZVRyaWFuZ2xlQW5pbWF0aW9uIH0gZnJvbSBcIi4vcm90YXRlVHJpYW5nbGVBbmltYXRpb25cIjtcclxuaW1wb3J0IHsgY29sb3JmdWxQb2ludHMgfSBmcm9tIFwiLi9jb2xvcmZ1bFBvaW50c1wiO1xyXG5pbXBvcnQgeyBjb2xvcmZ1bFRyaWFuZ2xlIH0gZnJvbSBcIi4vY29sb3JmdWxUcmlhbmdsZVwiO1xyXG5cclxuXHJcbmNvbnN0IHJlbmRlcmVyID0ge1xyXG4gICAgY2xlYXJCYWNrZ3JvdW5kLFxyXG4gICAgcG9pbnQsXHJcbiAgICBjbGlja1BvaW50LFxyXG4gICAgY2xpY2tQb2ludHMsXHJcbiAgICBkcmF3UG9pbnRzVXNlQnVmZmVyLFxyXG4gICAgdHJpYW5nbGUsXHJcbiAgICByb3RhdGVUcmlhbmdsZVVzZU1hdHJpeCxcclxuICAgIHJvdGF0ZVRyaWFuZ2xlQW5pbWF0aW9uLFxyXG4gICAgY29sb3JmdWxQb2ludHMsXHJcbiAgICBjb2xvcmZ1bFRyaWFuZ2xlLFxyXG59O1xyXG5cclxuY29uc3QgcmVuZGVyZXJMaXN0ID0gT2JqZWN0LmtleXMocmVuZGVyZXIpO1xyXG5zaG93UmVuZGVyZXJMaXN0KHJlbmRlcmVyTGlzdCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZW5kZXJlcjsiLCJpbXBvcnQgeyBpbml0U2hhZGVycyB9IGZyb20gXCIuLi9pbml0U2hhZGVyXCI7XHJcbmltcG9ydCB7IGNsZWFyQmFja2dyb3VuZCB9IGZyb20gXCIuL2NsZWFyQmFja2dyb3VuZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBvaW50ID0gZnVuY3Rpb24oZ2wpIHtcclxuICAgIGNvbnN0IHBvaW50U2hhZGVyID0gYFxyXG4gICAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoMC4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICAgICAgICAgIGdsX1BvaW50U2l6ZSA9IDEwLjA7XHJcbiAgICAgIH1cclxuICAgIGA7XHJcblxyXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBgXHJcbiAgICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBpZiAoIWluaXRTaGFkZXJzKGdsLCBwb2ludFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgY3JlYXRlIHByb2dyYW0sIHBsZWFzZSBjaGVjayB5b3VyIHNoYWRlclwiKTtcclxuXHJcbiAgICBjbGVhckJhY2tncm91bmQoZ2wpO1xyXG5cclxuICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCAxKTtcclxufTsiLCJpbXBvcnQge1xyXG4gICAgaW5pdFNoYWRlcnNcclxufSBmcm9tIFwiLi4vaW5pdFNoYWRlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgY2xlYXJCYWNrZ3JvdW5kXHJcbn0gZnJvbSBcIi4vY2xlYXJCYWNrZ3JvdW5kXCI7XHJcbmltcG9ydCB7IGdldEFyYyB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbCBcclxuICovXHJcbmV4cG9ydCBjb25zdCByb3RhdGVUcmlhbmdsZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChnbCkge1xyXG4gICAgY29uc3QgcG9pbnRTaGFkZXIgPSBgXHJcbiAgICAgICAgYXR0cmlidXRlIHZlYzQgT3JpZ2luUG9zaXRpb247XHJcbiAgICAgICAgdW5pZm9ybSBtYXQ0IFJvdGF0ZU1hdHJpeDtcclxuICAgICAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gUm90YXRlTWF0cml4ICogT3JpZ2luUG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGBcclxuICAgICAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICAgICAgICB9XHJcbiAgICBgO1xyXG5cclxuICAgIGlmICghaW5pdFNoYWRlcnMoZ2wsIHBvaW50U2hhZGVyLCBmcmFnbWVudFNoYWRlcikpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBjcmVhdGUgcHJvZ3JhbSwgcGxlYXNlIGNoZWNrIHlvdXIgc2hhZGVyXCIpO1xyXG5cclxuICAgIGNsZWFyQmFja2dyb3VuZChnbCk7XHJcblxyXG4gICAgLy8g5Z+656GA5Zu+5b2iXHJcbiAgICBjb25zdCBwb2ludHMgPSBuZXcgRmxvYXQzMkFycmF5KFswLjUsIDAuMCwgMC4wLCAwLjUsIC0wLjUsIDAuMF0pO1xyXG4gICAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgcG9pbnRzLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgY29uc3QgYXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihnbC5wcm9ncmFtLCBcIk9yaWdpblBvc2l0aW9uXCIpO1xyXG4gICAgY29uc3QgdW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKGdsLnByb2dyYW0sIFwiUm90YXRlTWF0cml4XCIpO1xyXG5cclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoYXR0cmlidXRlTG9jYXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyaWJ1dGVMb2NhdGlvbik7XHJcblxyXG4gICAgY29uc3QgZGVncmVlU3RlcCA9IDE1LjA7IFxyXG4gICAgbGV0IGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGxldCBjdXJyZW50RGVncmVlID0gMC4wO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgICAgICAgZHJhdyhnZXROZXh0RnJhbWUoKSk7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG4gICAgfVxyXG4gICAgYW5pbWF0ZSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldE5leHRGcmFtZSgpIHtcclxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhID0gbm93IC0gbGFzdFRpbWU7XHJcbiAgICAgICAgbGFzdFRpbWUgPSBub3c7XHJcbiAgICAgICAgY29uc3QgZGVncmVlID0gY3VycmVudERlZ3JlZSArIGRlZ3JlZVN0ZXAgKiBkZWx0YSAvIDEwMDAgO1xyXG4gICAgICAgIGN1cnJlbnREZWdyZWUgPSBkZWdyZWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgY29zQixcclxuICAgICAgICAgICAgc2luQlxyXG4gICAgICAgIH0gPSBnZXRBcmMoZGVncmVlKTtcclxuXHJcbiAgICAgICAgY29uc3Qgcm90YXRlTWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheShbXHJcbiAgICAgICAgICAgIGNvc0IsIHNpbkIsIDAsIDAsXHJcbiAgICAgICAgICAgIC1zaW5CLCBjb3NCLCAwLCAwLFxyXG4gICAgICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgICAgICAwLCAwLCAwLCAxLFxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIHJldHVybiByb3RhdGVNYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZHJhdyhyb3RhdGVNYXRyaXgpIHtcclxuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHVuaWZvcm1Mb2NhdGlvbiwgZmFsc2UsIHJvdGF0ZU1hdHJpeCk7XHJcbiAgICAgICAgY2xlYXJCYWNrZ3JvdW5kKGdsKTtcclxuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgMyk7XHJcbiAgICB9XHJcbn07IiwiaW1wb3J0IHtcclxuICAgIGluaXRTaGFkZXJzXHJcbn0gZnJvbSBcIi4uL2luaXRTaGFkZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIGNsZWFyQmFja2dyb3VuZFxyXG59IGZyb20gXCIuL2NsZWFyQmFja2dyb3VuZFwiO1xyXG5pbXBvcnQgeyBnZXRBcmMgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2wgXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgcm90YXRlVHJpYW5nbGVVc2VNYXRyaXggPSBmdW5jdGlvbiAoZ2wpIHtcclxuICAgIGNvbnN0IHBvaW50U2hhZGVyID0gYFxyXG4gICAgICAgIGF0dHJpYnV0ZSB2ZWM0IE9yaWdpblBvc2l0aW9uO1xyXG4gICAgICAgIHVuaWZvcm0gbWF0NCBSb3RhdGVNYXRyaXg7XHJcbiAgICAgICAgdm9pZCBtYWluKCkge1xyXG4gICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IFJvdGF0ZU1hdHJpeCAqIE9yaWdpblBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIGA7XHJcblxyXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBgXHJcbiAgICAgICAgdm9pZCBtYWluKCkge1xyXG4gICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBpZiAoIWluaXRTaGFkZXJzKGdsLCBwb2ludFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgY3JlYXRlIHByb2dyYW0sIHBsZWFzZSBjaGVjayB5b3VyIHNoYWRlclwiKTtcclxuXHJcbiAgICBjbGVhckJhY2tncm91bmQoZ2wpO1xyXG5cclxuICAgIGNvbnN0IHtjb3NCLCBzaW5CfSA9IGdldEFyYyg5MCk7XHJcblxyXG4gICAgY29uc3Qgcm90YXRlTWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheShbXHJcbiAgICAgICAgY29zQiwgc2luQiwgMCwgMCxcclxuICAgICAgICAtc2luQiwgY29zQiwgMCwgMCxcclxuICAgICAgICAwLCAwLCAxLCAwLFxyXG4gICAgICAgIDAsIDAsIDAsIDEsXHJcbiAgICBdKTtcclxuXHJcbiAgICBjb25zdCBwb2ludHMgPSBuZXcgRmxvYXQzMkFycmF5KFswLjUsIDAuMCwgMC4wLCAwLjUsIC0wLjUsIDAuMF0pO1xyXG4gICAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgcG9pbnRzLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgY29uc3QgYXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihnbC5wcm9ncmFtLCBcIk9yaWdpblBvc2l0aW9uXCIpO1xyXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRyaWJ1dGVMb2NhdGlvbiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYnV0ZUxvY2F0aW9uKTtcclxuXHJcbiAgICBjb25zdCB1bmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oZ2wucHJvZ3JhbSwgXCJSb3RhdGVNYXRyaXhcIik7XHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHVuaWZvcm1Mb2NhdGlvbiwgZmFsc2UsIHJvdGF0ZU1hdHJpeCk7XHJcbiAgICBcclxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCAzKTtcclxufTsiLCJpbXBvcnQgeyBkcmF3UG9pbnRzVXNlQnVmZmVyIH0gZnJvbSBcIi4vZHJhd1BvaW50c1VzZUJ1ZmZlclwiO1xyXG5cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2wgXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdHJpYW5nbGUgPSBmdW5jdGlvbihnbCkge1xyXG4gICAgZHJhd1BvaW50c1VzZUJ1ZmZlcihnbCwgZ2wuVFJJQU5HTEVTKTtcclxufTsiLCIvKipcclxuICogYE1hdGguc2luL2Nvc2AgdXNlIHJhZGlhbnMsIGJ1dCB3ZSB1c2UgZGVncmVlcy4gXHJcbiAqIFRoZSBmdW5jdGlvbiBjYW4gY2FjdWxhdGUgdGhlIHNpbi9jb3Mgb2YgZGVncmVlcy5cclxuICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZVxyXG4gKiBAcmV0dXJucyBzaW4oZGVncmVlKSwgY29zKGRlZ3JlZSlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBcmMoZGVncmVlKSB7XHJcbiAgICBjb25zdCByYWQgPSBkZWdyZWUgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzaW5COiBNYXRoLnNpbihyYWQpLFxyXG4gICAgICAgIGNvc0I6IE1hdGguY29zKHJhZClcclxuICAgIH07XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgQ0FOVkFTXHJcbn0gZnJvbSBcIi4vY29uc3RhbnRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcclxuICAgIGNvbnN0IGVycm9yRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG93LWVycm9yXCIpO1xyXG5cclxuICAgIGVycm9yRGl2LmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICBlcnJvckRpdi5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93UmVuZGVyZXJMaXN0KGxpc3QpIHtcclxuICAgIGNvbnN0IHJlbmRlcmVyTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyZXItbGlzdFwiKTtcclxuICAgIHJlbmRlcmVyTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgZm9yIChjb25zdCByZW5kZXJlciBvZiBsaXN0KSB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICAgICAgY29uc3QgaHJlZiA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoXCI/XCIpWzBdICsgXCI/d2hpY2g9XCIgKyByZW5kZXJlcjtcclxuICAgICAgICBsaS5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiR7aHJlZn1cIj4gJHtyZW5kZXJlcn0gPC9hPmA7XHJcbiAgICAgICAgcmVuZGVyZXJMaXN0LmFwcGVuZENoaWxkKGxpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlYkdMQ29udGV4dChlbGVtZW50SUQpIHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJRCk7XHJcbiAgICBjb25zdCBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2xcIik7IC8vIHRvZG86IOWcqOi/memHjOabtOaWsENhbnZhc+eahOWkp+Wwj++8jOiAg+iZkeWJr+S9nOeUqFxyXG4gICAgcmV0dXJuIGdsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydENsaWVudFRvV2ViR0xQb3NpdGlvbihjbGllbnRYLCBjbGllbnRZLCB6LCByZWN0KSB7XHJcbiAgICBsZXQgeCA9ICgoY2xpZW50WCAtIHJlY3QubGVmdCkgLSBDQU5WQVMuaGVpZ2h0IC8gMikgLyAoQ0FOVkFTLmhlaWdodCAvIDIpO1xyXG4gICAgbGV0IHkgPSAtKChjbGllbnRZIC0gcmVjdC50b3ApIC0gQ0FOVkFTLndpZHRoIC8gMikgLyAoQ0FOVkFTLndpZHRoIC8gMik7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeSxcclxuICAgICAgICB6XHJcbiAgICB9O1xyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9