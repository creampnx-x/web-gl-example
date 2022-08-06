import renderer from "./renderer/index";
export class Example {
    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     * @param {URLSearchParams} query 
     */
    constructor(gl, query) {
        this.gl = gl;
        this.whichExample = query.get("which") || "clear-bg";
    }

    render() {
        const render = renderer?.[this.whichExample];
        if (!render) throw new Error(`can not find renderer for ${this.whichExample}`);
        render.apply(this, [this.gl]);
    }
}