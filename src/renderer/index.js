import { point } from "./point";
import { clearBackground } from "./clearBackground";
import { clickPoint } from "./clickPoint";
import { clickPoints } from "./clickPoints";
import { showRendererList } from "../util";
import { drawPointsUseBuffer } from "./drawPointsUseBuffer";
import { triangle } from "./triangle";
import { rotateTriangleUseMatrix } from "./rotateTriangleUseMatrix";
import { rotateTriangleAnimation } from "./rotateTriangleAnimation";


const renderer = {
    clearBackground,
    point,
    clickPoint,
    clickPoints,
    drawPointsUseBuffer,
    triangle,
    rotateTriangleUseMatrix,
    rotateTriangleAnimation
};

const rendererList = Object.keys(renderer);
showRendererList(rendererList);

export default renderer;