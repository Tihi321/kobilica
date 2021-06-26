import { Background } from "./Background";
import { domReady } from "../utils/index";

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
    
    if (showGui) {
      const contentElement = document.querySelector(".content") as HTMLElement;
      contentElement.classList.add("hidden");
    }
  });
}
