import renderer from "./renderer/index";
export class Example {
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
        const render = renderer?.[this.whichExample];
        if (!render) throw new Error(`can not find renderer for ${this.whichExample}`);
        render(this.gl); // fixed: 取消了this的关联性
    }
}