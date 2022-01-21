import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import merge from "./merge";

import { defaultOptions } from "./default";
import { CDOptions, CDResult } from "./types";

const createCanvas = async (
  options: CDOptions
): Promise<HTMLCanvasElement | void> => {
  const canvas: HTMLCanvasElement | void = await html2canvas(options.element, {
    windowWidth: options.element.scrollWidth,
    windowHeight: options.element.scrollHeight,
  }).then((canvas) => {
    const container: HTMLElement = document.createElement("div");
    container.setAttribute("id", options.id);
    container.appendChild(canvas);

    document.body.appendChild(container);
  });
  return canvas;
};

const createPdf = async (
  options: CDOptions,
  canvas: HTMLCanvasElement
): Promise<void> => {
  const image = canvas.toDataURL("image/jpeg,1.0");
  const doc = new jsPDF();

  doc.addImage(
    image,
    "JPEG",
    15,
    2,
    options.document.format[0],
    options.document.format[1]
  );
  doc.save("Download.pdf");
};

export const createDocument = async (
  opts: Partial<CDOptions>
): Promise<CDResult> => {
  const options: CDOptions = merge(defaultOptions, opts);
  const canvas = await createCanvas(options);
  let pdfData: any;

  if (canvas) {
    pdfData = await createPdf(options, canvas);
  }
  return {
    canvas: canvas,
  };
};
export default createDocument;
