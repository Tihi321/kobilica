<script lang="ts">
  import Container from "./Container.svelte";
  import SlideButton from "./SlideButton.svelte";
  import Slide from "./Slide.svelte";
  import { onMount, onDestroy } from "svelte";
  import { sendCameraForward, sendCameraBackward } from "../utils";
  import { useSlider } from "../hooks";
  import { Slides, SlideButtonType } from "../constants";

  const { prevSlide, nextSlide, slide } = useSlider();

  let backgroundElement: HTMLElement;
  let slideNextInterval;

  const sendCameraPostionEvents = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      next();
    }
    if (event.key === "ArrowLeft") {
      back();
    }
  };

  onMount(() => {
    backgroundElement = document.querySelector(
      ".background-canvas"
    ) as HTMLElement;

    addEventListener("keyup", sendCameraPostionEvents);

    slideNextInterval = setInterval(next, 10000);
  });

  onDestroy(() => {
    removeEventListener("keyup", sendCameraPostionEvents);
    clearInterval(slideNextInterval);
  });

  const next = () => {
    nextSlide();
    sendCameraForward(backgroundElement);
  };
  const back = () => {
    prevSlide();
    sendCameraBackward(backgroundElement);
  };
</script>

<div class="container">
  <Container>
    <div class="slider">
      <SlideButton on:click={back} type={SlideButtonType.Back} />
      <div class="content">
        <Slide hide={$slide !== Slides.About}>
          <h2>Why Kobilica ?</h2>
          Being an entrepreneur myself, I realized the difficulties of startup companies
          in having a predictable price for their web design and web development
          needs, since these initial costs at a startup are the most important ones.
          Kobilica was funded to enable mostly small (but also medium) sized startups
          to get their web presence and their web solutions out into the world without
          running over budget. You can pay a flat monthly fee (according to your
          chosen plan) and Kobilica will deliver each request during that month from
          your prioritized backlog of requests. No commitements, no hidden fees,
          cancel at any time.
          <div>Tihomir Selak Founder, Kobilica</div>
        </Slide>
        <Slide hide={$slide !== Slides.Services}>
          We work on your project from start to finish until we achieve the
          desired results.
          <div>Services:</div>
          <ul>
            <li>Websites</li>
            <li>Web Applications</li>
            <li>Hybrid (mobile) Applications</li>
          </ul>
        </Slide>
        <Slide hide={$slide !== Slides.Contact}>email: tknox@gmail.com</Slide>
      </div>
      <SlideButton on:click={next} type={SlideButtonType.Next} />
    </div>
  </Container>
</div>

<style>
  .container {
    flex: 1;
  }

  .slider {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .content {
    flex: 1;
    position: relative;
    margin: 24px;
  }
</style>
