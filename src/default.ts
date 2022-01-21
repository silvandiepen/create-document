import { CDDocumentUnit, CDDocumentOrientation, CDOptions } from "./types";

export const defaultOptions: CDOptions = {
  element: document.body,
  id: "create-document-container",
  document: {
    orientation: CDDocumentOrientation.PORTRAIT,
    unit: CDDocumentUnit.MM,
    format: [297, 210],
  },
};
