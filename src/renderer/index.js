import { point } from "./point";
import { clearBackground } from "./clearBackground";
import { clickPoint } from "./clickPoint";
import { clickPoints } from "./clickPoints";
import { showRendererList } from "../util";


const renderer = {
    clearBackground,
    point,
    clickPoint,
    clickPoints
};

const rendererList = Object.keys(renderer);
showRendererList(rendererList);

export default renderer;