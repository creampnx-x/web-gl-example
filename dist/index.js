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












const renderer = {
    clearBackground: _clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground,
    point: _point__WEBPACK_IMPORTED_MODULE_0__.point,
    clickPoint: _clickPoint__WEBPACK_IMPORTED_MODULE_2__.clickPoint,
    clickPoints: _clickPoints__WEBPACK_IMPORTED_MODULE_3__.clickPoints,
    drawPointsUseBuffer: _drawPointsUseBuffer__WEBPACK_IMPORTED_MODULE_5__.drawPointsUseBuffer,
    triangle: _triangle__WEBPACK_IMPORTED_MODULE_6__.triangle,
    rotateTriangleUseMatrix: _rotateTriangleUseMatrix__WEBPACK_IMPORTED_MODULE_7__.rotateTriangleUseMatrix,
    rotateTriangleAnimation: _rotateTriangleAnimation__WEBPACK_IMPORTED_MODULE_8__.rotateTriangleAnimation,
    colorfulPoints: _colorfulPoints__WEBPACK_IMPORTED_MODULE_9__.colorfulPoints
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDTztBQUNQLHFDQUFxQyxvREFBYSxTQUFTLG9EQUFhO0FBQ3hFLHFDQUFxQyxtREFBWSxTQUFTLG1EQUFZO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL0V4YW1wbGUuanMiLCJ3ZWJwYWNrOi8vd2ViLWdsLWV4YW1wbGUvLi9zcmMvY29uc3RhbnQuanMiLCJ3ZWJwYWNrOi8vd2ViLWdsLWV4YW1wbGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2ViLWdsLWV4YW1wbGUvLi9zcmMvaW5pdFNoYWRlci5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci9jbGVhckJhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vd2ViLWdsLWV4YW1wbGUvLi9zcmMvcmVuZGVyZXIvY2xpY2tQb2ludC5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci9jbGlja1BvaW50cy5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci9jb2xvcmZ1bFBvaW50cy5qcyIsIndlYnBhY2s6Ly93ZWItZ2wtZXhhbXBsZS8uL3NyYy9yZW5kZXJlci9kcmF3UG9pbnRzVXNlQnVmZmVyLmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL2luZGV4LmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL3BvaW50LmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL3JvdGF0ZVRyaWFuZ2xlQW5pbWF0aW9uLmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL3JvdGF0ZVRyaWFuZ2xlVXNlTWF0cml4LmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL3RyaWFuZ2xlLmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3JlbmRlcmVyL3V0aWxzLmpzIiwid2VicGFjazovL3dlYi1nbC1leGFtcGxlLy4vc3JjL3V0aWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlbmRlcmVyIGZyb20gXCIuL3JlbmRlcmVyL2luZGV4XCI7XHJcbmV4cG9ydCBjbGFzcyBFeGFtcGxlIHtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1dlYkdMMlJlbmRlcmluZ0NvbnRleHR9IGdsIFxyXG4gICAgICogQHBhcmFtIHtVUkxTZWFyY2hQYXJhbXN9IHF1ZXJ5IFxyXG4gICAgICogQHRvZG8g5bCG6L+Z5Liq57G75pS56YCg5oiQ5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGdsLCBxdWVyeSkge1xyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICB0aGlzLndoaWNoRXhhbXBsZSA9IHF1ZXJ5LmdldChcIndoaWNoXCIpIHx8IFwiY2xlYXJCYWNrZ3JvdW5kXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHJlbmRlciA9IHJlbmRlcmVyPy5bdGhpcy53aGljaEV4YW1wbGVdO1xyXG4gICAgICAgIGlmICghcmVuZGVyKSB0aHJvdyBuZXcgRXJyb3IoYGNhbiBub3QgZmluZCByZW5kZXJlciBmb3IgJHt0aGlzLndoaWNoRXhhbXBsZX1gKTtcclxuICAgICAgICByZW5kZXIodGhpcy5nbCk7IC8vIGZpeGVkOiDlj5bmtojkuoZ0aGlz55qE5YWz6IGU5oCnXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3QgQ0FOVkFTID0ge1xyXG4gICAgd2lkdGg6IDQwMCxcclxuICAgIGhlaWdodDogNDAwXHJcbn07IiwiaW1wb3J0IHsgRXhhbXBsZSB9IGZyb20gXCIuL0V4YW1wbGVcIjsgXHJcbmltcG9ydCB7IHNob3dFcnJvciwgZ2V0V2ViR0xDb250ZXh0IH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICAgIGNvbnN0IGdsID0gZ2V0V2ViR0xDb250ZXh0KFwiY2FudmFzXCIpO1xyXG5cclxuICAgIGlmICghZ2wpIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgY3JlYXRlIHdlYmdsIGNvbnRleHRcIik7XHJcbiAgICBcclxuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpO1xyXG4gICAgY29uc3QgZXhhbXBsZSA9IG5ldyBFeGFtcGxlKGdsLCBxdWVyeSk7XHJcbiAgICBleGFtcGxlLnJlbmRlcigpO1xyXG59XHJcblxyXG53aW5kb3cub25lcnJvciA9IHNob3dFcnJvcjtcclxuXHJcbm1haW4oKTsiLCIvKipcclxuICogQ3JlYXRlIGEgcHJvZ3JhbSBvYmplY3QgYW5kIG1ha2UgY3VycmVudFxyXG4gKiBAcGFyYW0gZ2wgR0wgY29udGV4dFxyXG4gKiBAcGFyYW0gdnNoYWRlciBhIHZlcnRleCBzaGFkZXIgcHJvZ3JhbSAoc3RyaW5nKVxyXG4gKiBAcGFyYW0gZnNoYWRlciBhIGZyYWdtZW50IHNoYWRlciBwcm9ncmFtIChzdHJpbmcpXHJcbiAqIEByZXR1cm4gdHJ1ZSwgaWYgdGhlIHByb2dyYW0gb2JqZWN0IHdhcyBjcmVhdGVkIGFuZCBzdWNjZXNzZnVsbHkgbWFkZSBjdXJyZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNoYWRlcnMoZ2wsIHZzaGFkZXIsIGZzaGFkZXIpIHtcclxuICAgIHZhciBwcm9ncmFtID0gY3JlYXRlUHJvZ3JhbShnbCwgdnNoYWRlciwgZnNoYWRlcik7XHJcbiAgICBpZiAoIXByb2dyYW0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuaXoOazleWIm+W7uueoi+W6j+WvueixoSAxXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xyXG4gICAgZ2wucHJvZ3JhbSA9IHByb2dyYW07XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgdGhlIGxpbmtlZCBwcm9ncmFtIG9iamVjdFxyXG4gKiBAcGFyYW0gZ2wgR0wgY29udGV4dFxyXG4gKiBAcGFyYW0gdnNoYWRlciBhIHZlcnRleCBzaGFkZXIgcHJvZ3JhbSAoc3RyaW5nKVxyXG4gKiBAcGFyYW0gZnNoYWRlciBhIGZyYWdtZW50IHNoYWRlciBwcm9ncmFtIChzdHJpbmcpXHJcbiAqIEByZXR1cm4gY3JlYXRlZCBwcm9ncmFtIG9iamVjdCwgb3IgbnVsbCBpZiB0aGUgY3JlYXRpb24gaGFzIGZhaWxlZFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShnbCwgdnNoYWRlciwgZnNoYWRlcikge1xyXG4gICAgLy8g5Yib5bu6552A6Imy5Zmo5a+56LGhXHJcbiAgICB2YXIgdmVydGV4U2hhZGVyID0gbG9hZFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdnNoYWRlcik7XHJcbiAgICB2YXIgZnJhZ21lbnRTaGFkZXIgPSBsb2FkU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZzaGFkZXIpO1xyXG4gICAgaWYgKCF2ZXJ0ZXhTaGFkZXIgfHwgIWZyYWdtZW50U2hhZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yib5bu656iL5bqP5a+56LGhXHJcbiAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgIGlmICghcHJvZ3JhbSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS4uueoi+W6j+WvueixoeWIhumFjemhtueCueedgOiJsuWZqOWSjOeJh+WFg+edgOiJsuWZqFxyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XHJcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xyXG5cclxuICAgIC8vIOi/nuaOpeedgOiJsuWZqFxyXG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XHJcblxyXG4gICAgLy8g5qOA5p+l6L+e5o6lXHJcbiAgICB2YXIgbGlua2VkID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XHJcbiAgICBpZiAoIWxpbmtlZCkge1xyXG4gICAgICAgIHZhciBlcnJvciA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5peg5rOV6L+e5o6l56iL5bqP5a+56LGhOiAyIFwiICsgZXJyb3IpO1xyXG4gICAgICAgIGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XHJcbiAgICAgICAgZ2wuZGVsZXRlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcclxuICAgICAgICBnbC5kZWxldGVTaGFkZXIodmVydGV4U2hhZGVyKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9ncmFtO1xyXG59XHJcblxyXG4vKipcclxuICog5Yib5bu6552A6Imy5Zmo5a+56LGhXHJcbiAqIEBwYXJhbSBnbCBHTCBjb250ZXh0XHJcbiAqIEBwYXJhbSB0eXBlIHRoZSB0eXBlIG9mIHRoZSBzaGFkZXIgb2JqZWN0IHRvIGJlIGNyZWF0ZWRcclxuICogQHBhcmFtIHNvdXJjZSBzaGFkZXIgcHJvZ3JhbSAoc3RyaW5nKVxyXG4gKiBAcmV0dXJuIGNyZWF0ZWQgc2hhZGVyIG9iamVjdCwgb3IgbnVsbCBpZiB0aGUgY3JlYXRpb24gaGFzIGZhaWxlZC5cclxuICovXHJcbmZ1bmN0aW9uIGxvYWRTaGFkZXIoZ2wsIHR5cGUsIHNvdXJjZSkge1xyXG4gICAgLy8g5Yib5bu6552A6Imy5Zmo5a+56LGhXHJcbiAgICB2YXIgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xyXG4gICAgaWYgKHNoYWRlciA9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLml6Dms5XliJvlu7rnnYDoibLlmaggM1wiKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDorr7nva7nnYDoibLlmajmupDku6PnoIFcclxuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XHJcblxyXG4gICAgLy8g57yW6K+R552A6Imy5ZmoXHJcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XHJcblxyXG4gICAgLy8g5qOA5p+l552A6Imy5Zmo55qE57yW6K+R54q25oCBXHJcbiAgICB2YXIgY29tcGlsZWQgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XHJcbiAgICBpZiAoIWNvbXBpbGVkKSB7XHJcbiAgICAgICAgdmFyIGVycm9yID0gZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGNvbXBpbGUgc2hhZGVyOiA0XCIgKyBlcnJvcik7XHJcbiAgICAgICAgZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNoYWRlcjtcclxufSIsImV4cG9ydCBjb25zdCBjbGVhckJhY2tncm91bmQgPSAoZ2wpID0+IHtcclxuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG59OyIsImltcG9ydCB7IGluaXRTaGFkZXJzIH0gZnJvbSBcIi4uL2luaXRTaGFkZXJcIjtcclxuaW1wb3J0IHsgY29udmVydENsaWVudFRvV2ViR0xQb3NpdGlvbiB9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7IGNsZWFyQmFja2dyb3VuZCB9IGZyb20gXCIuL2NsZWFyQmFja2dyb3VuZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNsaWNrUG9pbnQgPSBmdW5jdGlvbiAoZ2wpIHtcclxuICAgIGNvbnN0IHBvaW50U2hhZGVyID0gYFxyXG4gICAgICBhdHRyaWJ1dGUgdmVjNCBEeW5hbWljUG9zaXRpb247XHJcbiAgICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICAgIGdsX1Bvc2l0aW9uID0gRHluYW1pY1Bvc2l0aW9uO1xyXG4gICAgICAgICAgZ2xfUG9pbnRTaXplID0gMTAuMDtcclxuICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGBcclxuICAgICAgdm9pZCBtYWluKCkge1xyXG4gICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLjAsIDAuMCwgMC4wLCAxLjApO1xyXG4gICAgICB9XHJcbiAgICBgO1xyXG5cclxuICAgIGlmICghaW5pdFNoYWRlcnMoZ2wsIHBvaW50U2hhZGVyLCBmcmFnbWVudFNoYWRlcikpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBjcmVhdGUgcHJvZ3JhbSwgcGxlYXNlIGNoZWNrIHlvdXIgc2hhZGVyXCIpO1xyXG5cclxuICAgIGNsZWFyQmFja2dyb3VuZChnbCk7XHJcblxyXG4gICAgZG9jdW1lbnQub25jbGljayA9IGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBvaW50TG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihnbC5wcm9ncmFtLCBcIkR5bmFtaWNQb3NpdGlvblwiKTtcclxuICAgICAgICBjb25zdCBwb2ludCA9IGNvbnZlcnRDbGllbnRUb1dlYkdMUG9zaXRpb24oXHJcbiAgICAgICAgICAgIGUuY2xpZW50WCxcclxuICAgICAgICAgICAgZS5jbGllbnRZLFxyXG4gICAgICAgICAgICAwLjAsXHJcbiAgICAgICAgICAgIGdsLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYjNmKHBvaW50TG9jYXRpb24sIHBvaW50LngsIHBvaW50LnksIHBvaW50LnopO1xyXG5cclxuICAgICAgICBjbGVhckJhY2tncm91bmQoZ2wpO1xyXG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCAxKTtcclxuICAgIH07XHJcbn07IiwiaW1wb3J0IHtcclxuICAgIGluaXRTaGFkZXJzXHJcbn0gZnJvbSBcIi4uL2luaXRTaGFkZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIGNvbnZlcnRDbGllbnRUb1dlYkdMUG9zaXRpb25cclxufSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQge1xyXG4gICAgY2xlYXJCYWNrZ3JvdW5kXHJcbn0gZnJvbSBcIi4vY2xlYXJCYWNrZ3JvdW5kXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY2xpY2tQb2ludHMgPSBmdW5jdGlvbiAoZ2wpIHtcclxuICAgIGNvbnN0IHBvaW50U2hhZGVyID0gYFxyXG4gICAgYXR0cmlidXRlIHZlYzQgRHluYW1pY1Bvc2l0aW9uO1xyXG4gICAgdm9pZCBtYWluKCkge1xyXG4gICAgICAgIGdsX1Bvc2l0aW9uID0gRHluYW1pY1Bvc2l0aW9uO1xyXG4gICAgICAgIGdsX1BvaW50U2l6ZSA9IDEwLjA7XHJcbiAgICB9XHJcbiAgYDtcclxuXHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGBcclxuICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgICB9XHJcbiAgYDtcclxuXHJcbiAgICBpZiAoIWluaXRTaGFkZXJzKGdsLCBwb2ludFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgY3JlYXRlIHByb2dyYW0sIHBsZWFzZSBjaGVjayB5b3VyIHNoYWRlclwiKTtcclxuXHJcbiAgICBjbGVhckJhY2tncm91bmQoZ2wpO1xyXG5cclxuICAgIGNvbnN0IGNsaWNrZWRQb2ludHMgPSBbXTtcclxuXHJcbiAgICBkb2N1bWVudC5vbmNsaWNrID0gKGUpID0+IHtcclxuICAgICAgICBjb25zdCBwb2ludExvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oZ2wucHJvZ3JhbSwgXCJEeW5hbWljUG9zaXRpb25cIik7XHJcbiAgICAgICAgY29uc3QgcG9pbnQgPSBjb252ZXJ0Q2xpZW50VG9XZWJHTFBvc2l0aW9uKFxyXG4gICAgICAgICAgICBlLmNsaWVudFgsXHJcbiAgICAgICAgICAgIGUuY2xpZW50WSxcclxuICAgICAgICAgICAgMC4wLFxyXG4gICAgICAgICAgICBnbC5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjbGlja2VkUG9pbnRzLnB1c2gocG9pbnQpO1xyXG4gICAgICAgIGNsZWFyQmFja2dyb3VuZChnbCk7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPGNsaWNrZWRQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZ2wudmVydGV4QXR0cmliM2YocG9pbnRMb2NhdGlvbiwgY2xpY2tlZFBvaW50c1tpXS54LCBjbGlja2VkUG9pbnRzW2ldLnksIGNsaWNrZWRQb2ludHNbaV0ueik7XHJcbiAgICAgICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59OyIsImltcG9ydCB7XHJcbiAgICBpbml0U2hhZGVyc1xyXG59IGZyb20gXCIuLi9pbml0U2hhZGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBjbGVhckJhY2tncm91bmRcclxufSBmcm9tIFwiLi9jbGVhckJhY2tncm91bmRcIjtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcclxuICogQHBhcmFtICB7bnVtYmVyfSBbZHJhd1R5cGVdIOe7mOeUu+eahOexu+Wei++8jOm7mOiupOS4ulBPSU5UU1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNvbG9yZnVsUG9pbnRzID0gZnVuY3Rpb24gKGdsLCBkcmF3VHlwZSkge1xyXG4gICAgY29uc3QgcG9pbnRTaGFkZXIgPSBgXHJcbiAgICAgIGF0dHJpYnV0ZSB2ZWM0IER5bmFtaWNQb3NpdGlvbjtcclxuICAgICAgYXR0cmlidXRlIHZlYzQgRHluYW1pY0NvbG9yO1xyXG4gICAgICB2YXJ5aW5nIHZlYzQgdmFyeWluZ0NvbG9yO1xyXG4gICAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgICBnbF9Qb3NpdGlvbiA9IER5bmFtaWNQb3NpdGlvbjtcclxuICAgICAgICAgIGdsX1BvaW50U2l6ZSA9IDEwLjA7XHJcbiAgICAgICAgICB2YXJ5aW5nQ29sb3IgPSBEeW5hbWljQ29sb3I7XHJcbiAgICAgIH1cclxuICAgIGA7XHJcblxyXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBgXHJcbiAgICAgIHZhcnlpbmcgdmVjNCB2YXJ5aW5nQ29sb3I7XHJcbiAgICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZhcnlpbmdDb2xvcjtcclxuICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBpZiAoIWluaXRTaGFkZXJzKGdsLCBwb2ludFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBub3QgY3JlYXRlIHByb2dyYW0sIHBsZWFzZSBjaGVjayB5b3VyIHNoYWRlclwiKTtcclxuXHJcbiAgICBjb25zdCBwb2ludHMgPSBuZXcgRmxvYXQzMkFycmF5KFtcclxuICAgICAgICAwLjUsIDAuMCwgMS4wLCAwLjAsIDAuMCxcclxuICAgICAgICAwLjAsIDAuNSwgMC4wLCAxLjAsIDEuMCxcclxuICAgICAgICAtMC41LCAwLjAsIDAuMCwgMC4wLCAxLjAsXHJcbiAgICBdKTtcclxuICAgIFxyXG4gICAgY29uc3QgcGVyUG9pbnRTaXplID0gcG9pbnRzLkJZVEVTX1BFUl9FTEVNRU5UO1xyXG5cclxuICAgIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG5cclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHBvaW50cywgZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgIGNvbnN0IHBvc2l0aW9uTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihnbC5wcm9ncmFtLCBcIkR5bmFtaWNQb3NpdGlvblwiKTtcclxuICAgIGNvbnN0IGNvbG9yTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihnbC5wcm9ncmFtLCBcIkR5bmFtaWNDb2xvclwiKTtcclxuXHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc2l0aW9uTG9jYXRpb24sIDIsIGdsLkZMT0FULCBmYWxzZSwgcGVyUG9pbnRTaXplICogNSwgMCk7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbkxvY2F0aW9uKTtcclxuXHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGNvbG9yTG9jYXRpb24sIDMsIGdsLkZMT0FULCBmYWxzZSwgcGVyUG9pbnRTaXplICogNSwgcGVyUG9pbnRTaXplICogMik7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShjb2xvckxvY2F0aW9uKTtcclxuICAgIFxyXG4gICAgY2xlYXJCYWNrZ3JvdW5kKGdsKTtcclxuICAgIGdsLmRyYXdBcnJheXMoZHJhd1R5cGUgfHwgZ2wuUE9JTlRTLCAwLCAzKTtcclxufTsiLCJpbXBvcnQge1xyXG4gICAgaW5pdFNoYWRlcnNcclxufSBmcm9tIFwiLi4vaW5pdFNoYWRlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgY2xlYXJCYWNrZ3JvdW5kXHJcbn0gZnJvbSBcIi4vY2xlYXJCYWNrZ3JvdW5kXCI7XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXHJcbiAqIEBwYXJhbSAge251bWJlcn0gW2RyYXdUeXBlXSDnu5jnlLvnmoTnsbvlnovvvIzpu5jorqTkuLpQT0lOVFNcclxuICovXHJcbmV4cG9ydCBjb25zdCBkcmF3UG9pbnRzVXNlQnVmZmVyID0gZnVuY3Rpb24gKGdsLCBkcmF3VHlwZSkge1xyXG4gICAgY29uc3QgcG9pbnRTaGFkZXIgPSBgXHJcbiAgICAgIGF0dHJpYnV0ZSB2ZWM0IER5bmFtaWNQb3NpdGlvbjtcclxuICAgICAgdm9pZCBtYWluKCkge1xyXG4gICAgICAgICAgZ2xfUG9zaXRpb24gPSBEeW5hbWljUG9zaXRpb247XHJcbiAgICAgICAgICBnbF9Qb2ludFNpemUgPSAxMC4wO1xyXG4gICAgICB9XHJcbiAgICBgO1xyXG5cclxuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gYFxyXG4gICAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgICAgIH1cclxuICAgIGA7XHJcblxyXG4gICAgaWYgKCFpbml0U2hhZGVycyhnbCwgcG9pbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyKSlcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4gbm90IGNyZWF0ZSBwcm9ncmFtLCBwbGVhc2UgY2hlY2sgeW91ciBzaGFkZXJcIik7XHJcblxyXG4gICAgY29uc3QgcG9pbnRzID0gbmV3IEZsb2F0MzJBcnJheShbMC41LCAwLjAsIDAuMCwgMC41LCAtMC41LCAwLjBdKTtcclxuICAgIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG5cclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHBvaW50cywgZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgIGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oZ2wucHJvZ3JhbSwgXCJEeW5hbWljUG9zaXRpb25cIik7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xyXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24pO1xyXG4gICAgXHJcbiAgICBjbGVhckJhY2tncm91bmQoZ2wpO1xyXG4gICAgZ2wuZHJhd0FycmF5cyhkcmF3VHlwZSA/PyBnbC5QT0lOVFMsIDAsIDMpO1xyXG59OyIsImltcG9ydCB7IHBvaW50IH0gZnJvbSBcIi4vcG9pbnRcIjtcclxuaW1wb3J0IHsgY2xlYXJCYWNrZ3JvdW5kIH0gZnJvbSBcIi4vY2xlYXJCYWNrZ3JvdW5kXCI7XHJcbmltcG9ydCB7IGNsaWNrUG9pbnQgfSBmcm9tIFwiLi9jbGlja1BvaW50XCI7XHJcbmltcG9ydCB7IGNsaWNrUG9pbnRzIH0gZnJvbSBcIi4vY2xpY2tQb2ludHNcIjtcclxuaW1wb3J0IHsgc2hvd1JlbmRlcmVyTGlzdCB9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7IGRyYXdQb2ludHNVc2VCdWZmZXIgfSBmcm9tIFwiLi9kcmF3UG9pbnRzVXNlQnVmZmVyXCI7XHJcbmltcG9ydCB7IHRyaWFuZ2xlIH0gZnJvbSBcIi4vdHJpYW5nbGVcIjtcclxuaW1wb3J0IHsgcm90YXRlVHJpYW5nbGVVc2VNYXRyaXggfSBmcm9tIFwiLi9yb3RhdGVUcmlhbmdsZVVzZU1hdHJpeFwiO1xyXG5pbXBvcnQgeyByb3RhdGVUcmlhbmdsZUFuaW1hdGlvbiB9IGZyb20gXCIuL3JvdGF0ZVRyaWFuZ2xlQW5pbWF0aW9uXCI7XHJcbmltcG9ydCB7IGNvbG9yZnVsUG9pbnRzIH0gZnJvbSBcIi4vY29sb3JmdWxQb2ludHNcIjtcclxuXHJcblxyXG5jb25zdCByZW5kZXJlciA9IHtcclxuICAgIGNsZWFyQmFja2dyb3VuZCxcclxuICAgIHBvaW50LFxyXG4gICAgY2xpY2tQb2ludCxcclxuICAgIGNsaWNrUG9pbnRzLFxyXG4gICAgZHJhd1BvaW50c1VzZUJ1ZmZlcixcclxuICAgIHRyaWFuZ2xlLFxyXG4gICAgcm90YXRlVHJpYW5nbGVVc2VNYXRyaXgsXHJcbiAgICByb3RhdGVUcmlhbmdsZUFuaW1hdGlvbixcclxuICAgIGNvbG9yZnVsUG9pbnRzXHJcbn07XHJcblxyXG5jb25zdCByZW5kZXJlckxpc3QgPSBPYmplY3Qua2V5cyhyZW5kZXJlcik7XHJcbnNob3dSZW5kZXJlckxpc3QocmVuZGVyZXJMaXN0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlbmRlcmVyOyIsImltcG9ydCB7IGluaXRTaGFkZXJzIH0gZnJvbSBcIi4uL2luaXRTaGFkZXJcIjtcclxuaW1wb3J0IHsgY2xlYXJCYWNrZ3JvdW5kIH0gZnJvbSBcIi4vY2xlYXJCYWNrZ3JvdW5kXCI7XHJcblxyXG5leHBvcnQgY29uc3QgcG9pbnQgPSBmdW5jdGlvbihnbCkge1xyXG4gICAgY29uc3QgcG9pbnRTaGFkZXIgPSBgXHJcbiAgICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNCgwLjAsIDAuMCwgMC4wLCAxLjApO1xyXG4gICAgICAgICAgZ2xfUG9pbnRTaXplID0gMTAuMDtcclxuICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGBcclxuICAgICAgdm9pZCBtYWluKCkge1xyXG4gICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLjAsIDAuMCwgMC4wLCAxLjApO1xyXG4gICAgICB9XHJcbiAgICBgO1xyXG5cclxuICAgIGlmICghaW5pdFNoYWRlcnMoZ2wsIHBvaW50U2hhZGVyLCBmcmFnbWVudFNoYWRlcikpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBjcmVhdGUgcHJvZ3JhbSwgcGxlYXNlIGNoZWNrIHlvdXIgc2hhZGVyXCIpO1xyXG5cclxuICAgIGNsZWFyQmFja2dyb3VuZChnbCk7XHJcblxyXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5QT0lOVFMsIDAsIDEpO1xyXG59OyIsImltcG9ydCB7XHJcbiAgICBpbml0U2hhZGVyc1xyXG59IGZyb20gXCIuLi9pbml0U2hhZGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBjbGVhckJhY2tncm91bmRcclxufSBmcm9tIFwiLi9jbGVhckJhY2tncm91bmRcIjtcclxuaW1wb3J0IHsgZ2V0QXJjIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsIFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJvdGF0ZVRyaWFuZ2xlQW5pbWF0aW9uID0gZnVuY3Rpb24gKGdsKSB7XHJcbiAgICBjb25zdCBwb2ludFNoYWRlciA9IGBcclxuICAgICAgICBhdHRyaWJ1dGUgdmVjNCBPcmlnaW5Qb3NpdGlvbjtcclxuICAgICAgICB1bmlmb3JtIG1hdDQgUm90YXRlTWF0cml4O1xyXG4gICAgICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSBSb3RhdGVNYXRyaXggKiBPcmlnaW5Qb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICBgO1xyXG5cclxuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gYFxyXG4gICAgICAgIHZvaWQgbWFpbigpIHtcclxuICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLjAsIDAuMCwgMC4wLCAxLjApO1xyXG4gICAgICAgIH1cclxuICAgIGA7XHJcblxyXG4gICAgaWYgKCFpbml0U2hhZGVycyhnbCwgcG9pbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyKSlcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4gbm90IGNyZWF0ZSBwcm9ncmFtLCBwbGVhc2UgY2hlY2sgeW91ciBzaGFkZXJcIik7XHJcblxyXG4gICAgY2xlYXJCYWNrZ3JvdW5kKGdsKTtcclxuXHJcbiAgICAvLyDln7rnoYDlm77lvaJcclxuICAgIGNvbnN0IHBvaW50cyA9IG5ldyBGbG9hdDMyQXJyYXkoWzAuNSwgMC4wLCAwLjAsIDAuNSwgLTAuNSwgMC4wXSk7XHJcbiAgICBjb25zdCBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwb2ludHMsIGdsLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICBjb25zdCBhdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKGdsLnByb2dyYW0sIFwiT3JpZ2luUG9zaXRpb25cIik7XHJcbiAgICBjb25zdCB1bmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oZ2wucHJvZ3JhbSwgXCJSb3RhdGVNYXRyaXhcIik7XHJcblxyXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRyaWJ1dGVMb2NhdGlvbiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYnV0ZUxvY2F0aW9uKTtcclxuXHJcbiAgICBjb25zdCBkZWdyZWVTdGVwID0gMTUuMDsgXHJcbiAgICBsZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgbGV0IGN1cnJlbnREZWdyZWUgPSAwLjA7XHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcclxuICAgICAgICBkcmF3KGdldE5leHRGcmFtZSgpKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICB9XHJcbiAgICBhbmltYXRlKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TmV4dEZyYW1lKCkge1xyXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSBsYXN0VGltZTtcclxuICAgICAgICBsYXN0VGltZSA9IG5vdztcclxuICAgICAgICBjb25zdCBkZWdyZWUgPSBjdXJyZW50RGVncmVlICsgZGVncmVlU3RlcCAqIGRlbHRhIC8gMTAwMCA7XHJcbiAgICAgICAgY3VycmVudERlZ3JlZSA9IGRlZ3JlZTtcclxuXHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBjb3NCLFxyXG4gICAgICAgICAgICBzaW5CXHJcbiAgICAgICAgfSA9IGdldEFyYyhkZWdyZWUpO1xyXG5cclxuICAgICAgICBjb25zdCByb3RhdGVNYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KFtcclxuICAgICAgICAgICAgY29zQiwgc2luQiwgMCwgMCxcclxuICAgICAgICAgICAgLXNpbkIsIGNvc0IsIDAsIDAsXHJcbiAgICAgICAgICAgIDAsIDAsIDEsIDAsXHJcbiAgICAgICAgICAgIDAsIDAsIDAsIDEsXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgcmV0dXJuIHJvdGF0ZU1hdHJpeDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkcmF3KHJvdGF0ZU1hdHJpeCkge1xyXG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodW5pZm9ybUxvY2F0aW9uLCBmYWxzZSwgcm90YXRlTWF0cml4KTtcclxuICAgICAgICBjbGVhckJhY2tncm91bmQoZ2wpO1xyXG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCAzKTtcclxuICAgIH1cclxufTsiLCJpbXBvcnQge1xyXG4gICAgaW5pdFNoYWRlcnNcclxufSBmcm9tIFwiLi4vaW5pdFNoYWRlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgY2xlYXJCYWNrZ3JvdW5kXHJcbn0gZnJvbSBcIi4vY2xlYXJCYWNrZ3JvdW5kXCI7XHJcbmltcG9ydCB7IGdldEFyYyB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbCBcclxuICovXHJcbmV4cG9ydCBjb25zdCByb3RhdGVUcmlhbmdsZVVzZU1hdHJpeCA9IGZ1bmN0aW9uIChnbCkge1xyXG4gICAgY29uc3QgcG9pbnRTaGFkZXIgPSBgXHJcbiAgICAgICAgYXR0cmlidXRlIHZlYzQgT3JpZ2luUG9zaXRpb247XHJcbiAgICAgICAgdW5pZm9ybSBtYXQ0IFJvdGF0ZU1hdHJpeDtcclxuICAgICAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gUm90YXRlTWF0cml4ICogT3JpZ2luUG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgYDtcclxuXHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGBcclxuICAgICAgICB2b2lkIG1haW4oKSB7XHJcbiAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICAgICAgICB9XHJcbiAgICBgO1xyXG5cclxuICAgIGlmICghaW5pdFNoYWRlcnMoZ2wsIHBvaW50U2hhZGVyLCBmcmFnbWVudFNoYWRlcikpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuIG5vdCBjcmVhdGUgcHJvZ3JhbSwgcGxlYXNlIGNoZWNrIHlvdXIgc2hhZGVyXCIpO1xyXG5cclxuICAgIGNsZWFyQmFja2dyb3VuZChnbCk7XHJcblxyXG4gICAgY29uc3Qge2Nvc0IsIHNpbkJ9ID0gZ2V0QXJjKDkwKTtcclxuXHJcbiAgICBjb25zdCByb3RhdGVNYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KFtcclxuICAgICAgICBjb3NCLCBzaW5CLCAwLCAwLFxyXG4gICAgICAgIC1zaW5CLCBjb3NCLCAwLCAwLFxyXG4gICAgICAgIDAsIDAsIDEsIDAsXHJcbiAgICAgICAgMCwgMCwgMCwgMSxcclxuICAgIF0pO1xyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IG5ldyBGbG9hdDMyQXJyYXkoWzAuNSwgMC4wLCAwLjAsIDAuNSwgLTAuNSwgMC4wXSk7XHJcbiAgICBjb25zdCBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwb2ludHMsIGdsLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICBjb25zdCBhdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKGdsLnByb2dyYW0sIFwiT3JpZ2luUG9zaXRpb25cIik7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJpYnV0ZUxvY2F0aW9uLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xyXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cmlidXRlTG9jYXRpb24pO1xyXG5cclxuICAgIGNvbnN0IHVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihnbC5wcm9ncmFtLCBcIlJvdGF0ZU1hdHJpeFwiKTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodW5pZm9ybUxvY2F0aW9uLCBmYWxzZSwgcm90YXRlTWF0cml4KTtcclxuICAgIFxyXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDMpO1xyXG59OyIsImltcG9ydCB7IGRyYXdQb2ludHNVc2VCdWZmZXIgfSBmcm9tIFwiLi9kcmF3UG9pbnRzVXNlQnVmZmVyXCI7XHJcblxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbCBcclxuICovXHJcbmV4cG9ydCBjb25zdCB0cmlhbmdsZSA9IGZ1bmN0aW9uKGdsKSB7XHJcbiAgICBkcmF3UG9pbnRzVXNlQnVmZmVyKGdsLCBnbC5UUklBTkdMRVMpO1xyXG59OyIsIi8qKlxyXG4gKiBgTWF0aC5zaW4vY29zYCB1c2UgcmFkaWFucywgYnV0IHdlIHVzZSBkZWdyZWVzLiBcclxuICogVGhlIGZ1bmN0aW9uIGNhbiBjYWN1bGF0ZSB0aGUgc2luL2NvcyBvZiBkZWdyZWVzLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVncmVlXHJcbiAqIEByZXR1cm5zIHNpbihkZWdyZWUpLCBjb3MoZGVncmVlKVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFyYyhkZWdyZWUpIHtcclxuICAgIGNvbnN0IHJhZCA9IGRlZ3JlZSAqIE1hdGguUEkgLyAxODA7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNpbkI6IE1hdGguc2luKHJhZCksXHJcbiAgICAgICAgY29zQjogTWF0aC5jb3MocmFkKVxyXG4gICAgfTtcclxufSIsImltcG9ydCB7XHJcbiAgICBDQU5WQVNcclxufSBmcm9tIFwiLi9jb25zdGFudFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgY29uc3QgZXJyb3JEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3ctZXJyb3JcIik7XHJcblxyXG4gICAgZXJyb3JEaXYuaW5uZXJIVE1MID0gbWVzc2FnZTtcclxuICAgIGVycm9yRGl2LnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dSZW5kZXJlckxpc3QobGlzdCkge1xyXG4gICAgY29uc3QgcmVuZGVyZXJMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJlci1saXN0XCIpO1xyXG4gICAgcmVuZGVyZXJMaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBmb3IgKGNvbnN0IHJlbmRlcmVyIG9mIGxpc3QpIHtcclxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICBjb25zdCBocmVmID0gbG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0gKyBcIj93aGljaD1cIiArIHJlbmRlcmVyO1xyXG4gICAgICAgIGxpLmlubmVySFRNTCA9IGA8YSBocmVmPVwiJHtocmVmfVwiPiAke3JlbmRlcmVyfSA8L2E+YDtcclxuICAgICAgICByZW5kZXJlckxpc3QuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2ViR0xDb250ZXh0KGVsZW1lbnRJRCkge1xyXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElEKTtcclxuICAgIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbFwiKTsgLy8gdG9kbzog5Zyo6L+Z6YeM5pu05pawQ2FudmFz55qE5aSn5bCP77yM6ICD6JmR5Ymv5L2c55SoXHJcbiAgICByZXR1cm4gZ2w7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0Q2xpZW50VG9XZWJHTFBvc2l0aW9uKGNsaWVudFgsIGNsaWVudFksIHosIHJlY3QpIHtcclxuICAgIGxldCB4ID0gKChjbGllbnRYIC0gcmVjdC5sZWZ0KSAtIENBTlZBUy5oZWlnaHQgLyAyKSAvIChDQU5WQVMuaGVpZ2h0IC8gMik7XHJcbiAgICBsZXQgeSA9IC0oKGNsaWVudFkgLSByZWN0LnRvcCkgLSBDQU5WQVMud2lkdGggLyAyKSAvIChDQU5WQVMud2lkdGggLyAyKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgeCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIHpcclxuICAgIH07XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=