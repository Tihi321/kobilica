import { Background } from "./Background";
import { Events } from "./constants/index";
import { domReady } from "./utils/index";

export const addBackground = (showGui: boolean = false) => {
  domReady(() => {
    const backgroundElement = document.querySelector(".background-canvas") as HTMLElement;
  
    const background = new Background(backgroundElement, showGui);
    background.init();
  
    const animate = () => {
      requestAnimationFrame(animate);
      background.animate();
    };
  
    animate();
  
    addEventListener("keyup", (event) => {
      if (event.key === "ArrowRight") {
        const event = new CustomEvent(Events.CameraForward);
        backgroundElement.dispatchEvent(event);
      }
      if (event.key === "ArrowLeft") {
        const event = new CustomEvent(Events.CameraBackward);
        backgroundElement.dispatchEvent(event);
      }
    });
  
    console.log(window);
  
    
    if (showGui) {
      const contentElement = document.querySelector(".content") as HTMLElement;
      contentElement.classList.add("hidden");
    }
  });
}
