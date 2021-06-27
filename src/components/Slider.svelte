<script lang="ts">
  import Container from "./Container.svelte";
  import SlideButton from "./SlideButton.svelte";
  import Slide from "./Slide.svelte";
  import Testimonial from "./Testimonial.svelte";
  import { onMount, onDestroy } from "svelte";
  import { sendCameraForward, sendCameraBackward } from "../utils";
  import { useSlider } from "../hooks";
  import { Slides, SlideButtonType } from "../constants";

  const { prevSlide, nextSlide, slide } = useSlider();

  let backgroundElement: HTMLElement;
  // let slideNextInterval: NodeJS.Timeout;

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

    // slideNextInterval = setInterval(next, 50000);
  });

  onDestroy(() => {
    removeEventListener("keyup", sendCameraPostionEvents);
    // clearInterval(slideNextInterval);
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
          <h2 class="title">Why Kobilica ?</h2>
          Being an entrepreneur myself, I realized the difficulties of startup companies
          in having a predictable price for their development needs, since these
          initial costs at a startup are the most important ones. Kobilica was funded
          to enable mostly small (but also medium) sized startups to get their web
          presence and their web solutions out into the world without running over
          budget. You can pay a flat monthly fee and Kobilica will deliver each request
          during that month from your prioritized backlog of requests. No commitements,
          no hidden fees, cancel at any time.
          <Testimonial
            name="Tihomir Selak"
            company="Kobilica"
            position="founder"
          />
        </Slide>
        <Slide hide={$slide !== Slides.Services}>
          <h2 class="title">Services</h2>
          We work on your project from start to finish until we achieve the desired
          results. Price can be prepaid or subscription based with fixed amount of
          hours for features, or variable per hour. It can be canceled any time.
          <ul>
            <li>Websites</li>
            <li>Web Applications</li>
            <li>Mobile Applications</li>
          </ul>
        </Slide>
        <Slide hide={$slide !== Slides.Contact}>
          <h2 class="title">Contact</h2>
          <a class="contact-link" href="mailto:tknox@gmail.com"
            >tknox@gmail.com</a
          >
        </Slide>
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

  ul {
    display: flex;
    list-style: none;
    padding-top: 40px;
  }

  li {
    font-weight: 700;
    padding: 0 10px;
  }

  .contact-link {
    font-weight: 700;
    display: inline-block;
    color: #2a2a57;
    text-decoration: none;
  }
</style>
