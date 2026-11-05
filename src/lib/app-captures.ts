/** Direct crops from the supplied Century recordings. Provenance is in
 * docs/application-screenshots-2026-11-04.md. No text is redrawn or translated. */
export const appCaptures = {
  models: {
    src: "/media/app/models.webp", width: 910, height: 342, tone: "light",
    title: "Models & controls",
    alt: "Century agent list detail showing model assignments, dates and action icons",
    caption: "Model assignments and agent controls, as they appear in the Century workspace",
  },
  files: {
    src: "/media/app/files.webp", width: 962, height: 304, tone: "dark",
    title: "Files & structured data",
    alt: "Four actual file-library rows in Century, showing JSON and text files with their sizes",
    caption: "Work with existing files in the application, including text documents and structured data",
  },
  response: {
    src: "/media/app/response.webp", width: 650, height: 98, tone: "dark",
    title: "Response details",
    alt: "Century response footer with copy and feedback controls, token counts and timing information",
    caption: "Inspect the token counts and timing details attached to an application response",
  },
  document: {
    src: "/media/app/document.webp", width: 962, height: 54, tone: "dark",
    title: "Document import",
    alt: "The actual Choose File control in Century's OCR document workspace",
    caption: "Choose a document directly in the OCR workspace",
  },
  audio: {
    src: "/media/app/audio.webp", width: 1514, height: 78, tone: "dark",
    title: "Audio playback",
    alt: "Century transcription workspace audio player with playback, seek and volume controls",
    caption: "Replay a recording from the transcription workspace",
  },
  "model-choice": {
    src: "/media/app/model-choice.webp", width: 296, height: 60, tone: "dark",
    title: "Model selection",
    alt: "The actual model selector in Century chat, displaying deepseek-v4-pro",
    caption: "Select the model for a conversation in the Century chat interface",
  },
} as const;

export type AppCaptureId = keyof typeof appCaptures;
