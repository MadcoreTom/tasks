
/*
* Tidied version of answer from https://stackoverflow.com/questions/3975499/convert-svg-to-image-jpeg-png-etc-in-the-browser
* by user worstenbrood
*/

import { TOP_MARGIN } from "../constants";

const CONTAINER_ELEMENTS = ["svg", "g"];
const DOMURL = window.URL || window.webkitURL || window;

function copyStylesInline(destinationNode, sourceNode) {
    for (let cd = 0; cd < destinationNode.childNodes.length; cd++) {
        const destChild = destinationNode.childNodes[cd];
        const sourceChild = (sourceNode.childNodes[cd] as SVGElement);
        if (CONTAINER_ELEMENTS.indexOf(destChild.tagName) != -1) {
            copyStylesInline(destChild, sourceNode.childNodes[cd]);
        } else {
            let style = "currentStyle" in sourceChild ? sourceChild.currentStyle : window.getComputedStyle(sourceChild);
            if (style != "undefined" && style != null){
                const curStyle = style as CSSStyleDeclaration;
                for (var st = 0; st < curStyle.length; st++) {
                    destChild.style.setProperty(style[st], curStyle.getPropertyValue(style[st]));
                }
            }
        }
    }
}

function triggerDownload(imgURI: string, fileName: string) {
    var evt = new MouseEvent("click", {
        view: window,
        bubbles: false,
        cancelable: true
    });
    var a = document.createElement("a");
    a.setAttribute("download", fileName);
    a.setAttribute("href", imgURI);
    a.setAttribute("target", '_blank');
    a.dispatchEvent(evt);
}

export function downloadSvg(svg: SVGSVGElement, fileName: string) {
    const copy = svg.cloneNode(true);
    copyStylesInline(copy, svg);
    const canvas = document.createElement("canvas");
    const bbox = svg.getBBox();
    canvas.width = bbox.width;
    canvas.height = bbox.height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, bbox.width, bbox.height);
    const data = (new XMLSerializer()).serializeToString(copy);
    const img = new Image();
    const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = DOMURL.createObjectURL(svgBlob);
    img.onload = function () {
        ctx.drawImage(img,-bbox.x, -bbox.y);
        DOMURL.revokeObjectURL(url);
        if (typeof navigator !== "undefined" && "msSaveOrOpenBlob" in navigator && "msToBlob" in canvas) {
            var blob = (canvas.msToBlob as any)();
            (navigator.msSaveOrOpenBlob as any)(blob, fileName);
        }
        else {
            var imgURI = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            triggerDownload(imgURI, fileName);
        }
        if(canvas.parentElement){
            canvas.parentElement.removeChild(canvas);
        }
    };
    img.src = url;
}