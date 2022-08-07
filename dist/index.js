"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkweb_gl_example"] = self["webpackChunkweb_gl_example"] || []).push([["index"],{

/***/ "./src/Example.js":
/*!************************!*\
  !*** ./src/Example.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Example\": () => (/* binding */ Example)\n/* harmony export */ });\n/* harmony import */ var _renderer_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer/index */ \"./src/renderer/index.js\");\n\r\nclass Example {\r\n    /**\r\n     * \r\n     * @param {WebGL2RenderingContext} gl \r\n     * @param {URLSearchParams} query \r\n     * @todo 将这个类改造成函数\r\n     */\r\n    constructor(gl, query) {\r\n        this.gl = gl;\r\n        this.whichExample = query.get(\"which\") || \"clearBackground\";\r\n    }\r\n\r\n    render() {\r\n        const render = _renderer_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"]?.[this.whichExample];\r\n        if (!render) throw new Error(`can not find renderer for ${this.whichExample}`);\r\n        render(this.gl); // fixed: 取消了this的关联性\r\n    }\r\n}\n\n//# sourceURL=webpack://web-gl-example/./src/Example.js?");

/***/ }),

/***/ "./src/constant.js":
/*!*************************!*\
  !*** ./src/constant.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CANVAS\": () => (/* binding */ CANVAS)\n/* harmony export */ });\nconst CANVAS = {\r\n    width: 400,\r\n    height: 400\r\n};\n\n//# sourceURL=webpack://web-gl-example/./src/constant.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Example__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Example */ \"./src/Example.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n \r\n\r\n\r\nfunction main() {\r\n    const gl = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getWebGLContext)(\"canvas\");\r\n\r\n    if (!gl) throw new Error(\"can not create webgl context\");\r\n    \r\n    const query = new URLSearchParams(location.search);\r\n    const example = new _Example__WEBPACK_IMPORTED_MODULE_0__.Example(gl, query);\r\n    example.render();\r\n}\r\n\r\nwindow.onerror = _util__WEBPACK_IMPORTED_MODULE_1__.showError;\r\n\r\nmain();\n\n//# sourceURL=webpack://web-gl-example/./src/index.js?");

/***/ }),

/***/ "./src/initShader.js":
/*!***************************!*\
  !*** ./src/initShader.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initShaders\": () => (/* binding */ initShaders)\n/* harmony export */ });\n/**\r\n * Create a program object and make current\r\n * @param gl GL context\r\n * @param vshader a vertex shader program (string)\r\n * @param fshader a fragment shader program (string)\r\n * @return true, if the program object was created and successfully made current\r\n */\r\nfunction initShaders(gl, vshader, fshader) {\r\n    var program = createProgram(gl, vshader, fshader);\r\n    if (!program) {\r\n        console.log(\"无法创建程序对象 1\");\r\n        return false;\r\n    }\r\n\r\n    gl.useProgram(program);\r\n    gl.program = program;\r\n\r\n    return true;\r\n}\r\n\r\n/**\r\n * Create the linked program object\r\n * @param gl GL context\r\n * @param vshader a vertex shader program (string)\r\n * @param fshader a fragment shader program (string)\r\n * @return created program object, or null if the creation has failed\r\n */\r\nfunction createProgram(gl, vshader, fshader) {\r\n    // 创建着色器对象\r\n    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);\r\n    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);\r\n    if (!vertexShader || !fragmentShader) {\r\n        return null;\r\n    }\r\n\r\n    // 创建程序对象\r\n    var program = gl.createProgram();\r\n    if (!program) {\r\n        return null;\r\n    }\r\n\r\n    // 为程序对象分配顶点着色器和片元着色器\r\n    gl.attachShader(program, vertexShader);\r\n    gl.attachShader(program, fragmentShader);\r\n\r\n    // 连接着色器\r\n    gl.linkProgram(program);\r\n\r\n    // 检查连接\r\n    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);\r\n    if (!linked) {\r\n        var error = gl.getProgramInfoLog(program);\r\n        console.log(\"无法连接程序对象: 2 \" + error);\r\n        gl.deleteProgram(program);\r\n        gl.deleteShader(fragmentShader);\r\n        gl.deleteShader(vertexShader);\r\n        return null;\r\n    }\r\n    return program;\r\n}\r\n\r\n/**\r\n * 创建着色器对象\r\n * @param gl GL context\r\n * @param type the type of the shader object to be created\r\n * @param source shader program (string)\r\n * @return created shader object, or null if the creation has failed.\r\n */\r\nfunction loadShader(gl, type, source) {\r\n    // 创建着色器对象\r\n    var shader = gl.createShader(type);\r\n    if (shader == null) {\r\n        console.log(\"无法创建着色器 3\");\r\n        return null;\r\n    }\r\n\r\n    // 设置着色器源代码\r\n    gl.shaderSource(shader, source);\r\n\r\n    // 编译着色器\r\n    gl.compileShader(shader);\r\n\r\n    // 检查着色器的编译状态\r\n    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\r\n    if (!compiled) {\r\n        var error = gl.getShaderInfoLog(shader);\r\n        console.log(\"Failed to compile shader: 4\" + error);\r\n        gl.deleteShader(shader);\r\n        return null;\r\n    }\r\n\r\n    return shader;\r\n}\n\n//# sourceURL=webpack://web-gl-example/./src/initShader.js?");

/***/ }),

/***/ "./src/renderer/clearBackground.js":
/*!*****************************************!*\
  !*** ./src/renderer/clearBackground.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clearBackground\": () => (/* binding */ clearBackground)\n/* harmony export */ });\nconst clearBackground = (gl) => {\r\n    gl.clearColor(0.0, 0.0, 0.0, 1.0);\r\n    gl.clear(gl.COLOR_BUFFER_BIT);\r\n};\n\n//# sourceURL=webpack://web-gl-example/./src/renderer/clearBackground.js?");

/***/ }),

/***/ "./src/renderer/clickPoint.js":
/*!************************************!*\
  !*** ./src/renderer/clickPoint.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clickPoint\": () => (/* binding */ clickPoint)\n/* harmony export */ });\n/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ \"./src/initShader.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ \"./src/util.js\");\n/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clearBackground */ \"./src/renderer/clearBackground.js\");\n\r\n\r\n\r\n\r\nconst clickPoint = function (gl) {\r\n    const pointShader = `\r\n      attribute vec4 DynamicPosition;\r\n      void main() {\r\n          gl_Position = DynamicPosition;\r\n          gl_PointSize = 10.0;\r\n      }\r\n    `;\r\n\r\n    const fragmentShader = `\r\n      void main() {\r\n          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\r\n      }\r\n    `;\r\n\r\n    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))\r\n        throw new Error(\"can not create program, please check your shader\");\r\n\r\n    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_2__.clearBackground)(gl);\r\n\r\n    document.onclick = e => {\r\n        const pointLocation = gl.getAttribLocation(gl.program, \"DynamicPosition\");\r\n        const point = (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertClientToWebGLPosition)(\r\n            e.clientX,\r\n            e.clientY,\r\n            0.0,\r\n            gl.canvas.getBoundingClientRect()\r\n        );\r\n\r\n        gl.vertexAttrib3f(pointLocation, point.x, point.y, point.z);\r\n\r\n        (0,_clearBackground__WEBPACK_IMPORTED_MODULE_2__.clearBackground)(gl);\r\n        gl.drawArrays(gl.POINTS, 0, 1);\r\n    };\r\n};\n\n//# sourceURL=webpack://web-gl-example/./src/renderer/clickPoint.js?");

/***/ }),

/***/ "./src/renderer/clickPoints.js":
/*!*************************************!*\
  !*** ./src/renderer/clickPoints.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clickPoints\": () => (/* binding */ clickPoints)\n/* harmony export */ });\n/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ \"./src/initShader.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ \"./src/util.js\");\n/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clearBackground */ \"./src/renderer/clearBackground.js\");\n\r\n\r\n\r\n\r\nconst clickPoints = function (gl) {\r\n    const pointShader = `\r\n    attribute vec4 DynamicPosition;\r\n    void main() {\r\n        gl_Position = DynamicPosition;\r\n        gl_PointSize = 10.0;\r\n    }\r\n  `;\r\n\r\n    const fragmentShader = `\r\n    void main() {\r\n        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\r\n    }\r\n  `;\r\n\r\n    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))\r\n        throw new Error(\"can not create program, please check your shader\");\r\n\r\n    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_2__.clearBackground)(gl);\r\n\r\n    const clickedPoints = [];\r\n\r\n    document.onclick = (e) => {\r\n        const pointLocation = gl.getAttribLocation(gl.program, \"DynamicPosition\");\r\n        const point = (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertClientToWebGLPosition)(\r\n            e.clientX,\r\n            e.clientY,\r\n            0.0,\r\n            gl.canvas.getBoundingClientRect()\r\n        );\r\n\r\n        clickedPoints.push(point);\r\n        (0,_clearBackground__WEBPACK_IMPORTED_MODULE_2__.clearBackground)(gl);\r\n        for (let i=0; i<clickedPoints.length; i++) {\r\n            gl.vertexAttrib3f(pointLocation, clickedPoints[i].x, clickedPoints[i].y, clickedPoints[i].z);\r\n            gl.drawArrays(gl.POINTS, 0, 1);\r\n        }\r\n    };\r\n};\n\n//# sourceURL=webpack://web-gl-example/./src/renderer/clickPoints.js?");

/***/ }),

/***/ "./src/renderer/index.js":
/*!*******************************!*\
  !*** ./src/renderer/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ \"./src/renderer/point.js\");\n/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearBackground */ \"./src/renderer/clearBackground.js\");\n/* harmony import */ var _clickPoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clickPoint */ \"./src/renderer/clickPoint.js\");\n/* harmony import */ var _clickPoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clickPoints */ \"./src/renderer/clickPoints.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util */ \"./src/util.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst renderer = {\r\n    clearBackground: _clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground,\r\n    point: _point__WEBPACK_IMPORTED_MODULE_0__.point,\r\n    clickPoint: _clickPoint__WEBPACK_IMPORTED_MODULE_2__.clickPoint,\r\n    clickPoints: _clickPoints__WEBPACK_IMPORTED_MODULE_3__.clickPoints\r\n};\r\n\r\nconst rendererList = Object.keys(renderer);\r\n(0,_util__WEBPACK_IMPORTED_MODULE_4__.showRendererList)(rendererList);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderer);\n\n//# sourceURL=webpack://web-gl-example/./src/renderer/index.js?");

/***/ }),

/***/ "./src/renderer/point.js":
/*!*******************************!*\
  !*** ./src/renderer/point.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"point\": () => (/* binding */ point)\n/* harmony export */ });\n/* harmony import */ var _initShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initShader */ \"./src/initShader.js\");\n/* harmony import */ var _clearBackground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clearBackground */ \"./src/renderer/clearBackground.js\");\n\r\n\r\n\r\nconst point = function(gl) {\r\n    const pointShader = `\r\n      void main() {\r\n          gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\r\n          gl_PointSize = 10.0;\r\n      }\r\n    `;\r\n\r\n    const fragmentShader = `\r\n      void main() {\r\n          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\r\n      }\r\n    `;\r\n\r\n    if (!(0,_initShader__WEBPACK_IMPORTED_MODULE_0__.initShaders)(gl, pointShader, fragmentShader))\r\n        throw new Error(\"can not create program, please check your shader\");\r\n\r\n    (0,_clearBackground__WEBPACK_IMPORTED_MODULE_1__.clearBackground)(gl);\r\n\r\n    gl.drawArrays(gl.POINTS, 0, 1);\r\n};\n\n//# sourceURL=webpack://web-gl-example/./src/renderer/point.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"convertClientToWebGLPosition\": () => (/* binding */ convertClientToWebGLPosition),\n/* harmony export */   \"getWebGLContext\": () => (/* binding */ getWebGLContext),\n/* harmony export */   \"showError\": () => (/* binding */ showError),\n/* harmony export */   \"showRendererList\": () => (/* binding */ showRendererList)\n/* harmony export */ });\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ \"./src/constant.js\");\n\r\n\r\nfunction showError(message) {\r\n    console.error(message);\r\n    const errorDiv = document.getElementById(\"show-error\");\r\n\r\n    errorDiv.innerHTML = message;\r\n    errorDiv.style.color = \"red\";\r\n}\r\n\r\nfunction showRendererList(list) {\r\n    const rendererList = document.getElementById(\"renderer-list\");\r\n    rendererList.innerHTML = \"\";\r\n    for (const renderer of list) {\r\n        const li = document.createElement(\"li\");\r\n        const href = location.href.split(\"?\")[0] + \"?which=\" + renderer;\r\n        li.innerHTML = `<a href=\"${href}\"> ${renderer} </a>`;\r\n        rendererList.appendChild(li);\r\n    }\r\n}\r\n\r\nfunction getWebGLContext(elementID) {\r\n    const canvas = document.getElementById(elementID);\r\n    const gl = canvas.getContext(\"webgl\"); // todo: 在这里更新Canvas的大小，考虑副作用\r\n    return gl;\r\n}\r\n\r\nfunction convertClientToWebGLPosition(clientX, clientY, z, rect) {\r\n    let x = ((clientX - rect.left) - _constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS.height / 2) / (_constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS.height / 2);\r\n    let y = -((clientY - rect.top) - _constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS.width / 2) / (_constant__WEBPACK_IMPORTED_MODULE_0__.CANVAS.width / 2);\r\n    return {\r\n        x,\r\n        y,\r\n        z\r\n    };\r\n}\n\n//# sourceURL=webpack://web-gl-example/./src/util.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);