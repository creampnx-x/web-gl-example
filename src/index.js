import { Example } from "./Example"; 
import { showError, getWebGLContext } from "./util";

function main() {
    const gl = getWebGLContext("canvas");

    if (!gl) throw new Error("can not create webgl context");
    
    const query = new URLSearchParams(location.search);
    const example = new Example(gl, query);
    example.render();
}

window.onerror = showError;

main();