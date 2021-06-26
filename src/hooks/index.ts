import { slide } from "../store";
import { Slides } from "../constants";
export const useSlider = () => {

  const nextSlide = () => {
    slide.update((slideNumber) => (slideNumber >= 2 ? 0 : slideNumber + 1));
  };

  const prevSlide = () => {
    slide.update((slideNumber) => (slideNumber === 0 ? 2 : slideNumber - 1));
  };

  const setAbout = () => {
    slide.set(Slides.About);
  };

  const setServices = () => {
    slide.set(Slides.Services);
  };

  const setContact = () => {
    slide.set(Slides.Contact);
  };

  return {nextSlide, prevSlide, setAbout, setServices, setContact, slide}
}