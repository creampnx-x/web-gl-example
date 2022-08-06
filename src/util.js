import {
    CANVAS
} from "./constant";

export function showError(message) {
    console.error(message);
    const errorDiv = document.getElementById("show-error");

    errorDiv.innerHTML = message;
    errorDiv.style.color = "red";
}

export function showRendererList(list) {
    const rendererList = document.getElementById("renderer-list");
    rendererList.innerHTML = "";
    for (const renderer of list) {
        const li = document.createElement("li");
        const href = location.href.split("?")[0] + "?which=" + renderer;
        li.innerHTML = `<a href="${href}"> ${renderer} </a>`;
        rendererList.appendChild(li);
    }
}

export function getWebGLContext(elementID) {
    const canvas = document.getElementById(elementID);
    const gl = canvas.getContext("webgl");
    return gl;
}

export function convertClientToWebGLPosition(clientX, clientY, z, rect) {
    let x = ((clientX - rect.left) - CANVAS.height / 2) / (CANVAS.height / 2);
    let y = -((clientY - rect.top) - CANVAS.width / 2) / (CANVAS.width / 2);
    return {
        x,
        y,
        z
    };
}