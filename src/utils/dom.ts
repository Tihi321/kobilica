export const domReady = (callback: any) => {
  return document.readyState === "interactive" ||
    document.readyState === "complete"
    ? callback()
    : document.addEventListener("DOMContentLoaded", callback);
};
