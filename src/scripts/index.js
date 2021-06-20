import { Background } from "./Background";
import { EVENTS } from "./constants";
import { domReady } from "./utils";

domReady(() => {
  const backgroundElement = document.querySelector(".background-canvas");

  const background = new Background(backgroundElement);
  background.init();

  const animate = () => {
    requestAnimationFrame(animate);
    background.animate();
  };

  animate();

  addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") {
      const event = new CustomEvent(EVENTS.CAMERA_FORWARD);
      backgroundElement.dispatchEvent(event);
    }
    if (event.key === "ArrowLeft") {
      const event = new CustomEvent(EVENTS.CAMERA_BACKWARD);
      backgroundElement.dispatchEvent(event);
    }
  });
});
