export enum CDDocumentOrientation {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait",
}
export enum CDDocumentUnit {
  MM = "mm",
  CM = "cm",
  IN = "in",
}

export interface CDOptions {
  element: HTMLElement;
  id: string;
  document: {
    orientation: CDDocumentOrientation;
    unit: CDDocumentUnit;
    format: [number, number];
  };
}
export interface CDResult {
  canvas: HTMLCanvasElement | void;
}
