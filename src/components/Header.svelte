<script lang="ts">
  import Logo from "./Logo.svelte";
  import Container from "./Container.svelte";
  import { onMount } from "svelte";
  import { LogoType, LogoColor } from "../constants";
  import {
    sendCameraPostionOne,
    sendCameraPostionTwo,
    sendCameraPostionThree,
  } from "../utils";
  import { Slides } from "../constants";
  import { useSlider } from "../hooks";

  const { setAbout, setServices, setContact, slide } = useSlider();

  let backgroundElement: HTMLElement;

  onMount(() => {
    backgroundElement = document.querySelector(
      ".background-canvas"
    ) as HTMLElement;
  });

  function sendAbout() {
    sendCameraPostionOne(backgroundElement);
    setAbout();
  }

  function sendServices() {
    sendCameraPostionTwo(backgroundElement);
    setServices();
  }

  function sendContact() {
    sendCameraPostionThree(backgroundElement);
    setContact();
  }
</script>

<header>
  <Container>
    <div class="header">
      <a href="/" class="logo"
        ><Logo type={LogoType.Stroke} color={LogoColor.Blue} /></a
      >
      <ul>
        <li class={$slide === Slides.About && "active"}>
          <button class="link" on:click={sendAbout}>About</button>
        </li>
        <li class={$slide === Slides.Services && "active"}>
          <button class="link" on:click={sendServices}>Services</button>
        </li>
        <li class={$slide === Slides.Contact && "active"}>
          <button class="link" on:click={sendContact}>Contact</button>
        </li>
        <li>
          <a class="link" href="https://www.tihomir-selak.from.hr/">Blog</a>
        </li>
      </ul>
    </div>
  </Container>
</header>

<style type="text/css">
  header {
    height: 100px;
    background: rgba(255, 255, 255, 0.8);
  }

  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .logo {
    max-width: 250px;
  }

  ul {
    list-style: none;
    display: flex;
  }

  .link {
    background: none;
    border: none;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    color: #2a2a57;
  }

  a.link {
    text-decoration: none;
    display: inline-block;
    padding: 0 10px;
  }

  .active {
    box-shadow: 0 5px 0 0 #2a2a57;
  }

  @media (min-width: 480px) {
    .logo {
      max-width: 150px;
    }
  }
</style>
