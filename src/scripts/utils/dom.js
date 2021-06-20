export const domReady = (callback) => {
  return document.readyState === "interactive" ||
    document.readyState === "complete"
    ? callback()
    : document.addEventListener("DOMContentLoaded", callback);
};
