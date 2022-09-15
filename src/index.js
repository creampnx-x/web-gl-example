import renderer from "./renderer";
import { showError, getWebGLContext } from "./util";

// show examples on page.
function showExamples(gl, query) {
    const whichExample = query.get("which") || "clearBackground";

    const render = renderer?.[whichExample];
    if (!render) throw new Error(`can not find renderer for ${this.whichExample}`);
    render(gl);
}


function main() {
    // catch global error and show on the page.
    window.onerror = showError;

    const gl = getWebGLContext("canvas");

    if (!gl) throw new Error("can not create webgl context");

    const query = new URLSearchParams(location.search);
    showExamples(gl, query);
}

main();