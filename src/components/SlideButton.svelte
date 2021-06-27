<script lang="ts">
  import type { TSlideButton } from "../types";
  import { SlideButtonType } from "../constants";

  export let type: TSlideButton;
</script>

<button on:click>
  {#if type === SlideButtonType.Back}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="arrow">
      <path class="arrow-path" d="m 10,3 -5,5 5,5 z" />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="arrow">
      <path class="arrow-path" d="m 6,3 5,5 -5,5 z" />
    </svg>
  {/if}
</button>

<style>
  button {
    cursor: pointer;
    background: none;
    border: none;
    outline: #ffffff;
    border-radius: 50%;
    font-size: 50px;
    font-weight: 700;
    color: #ffffff;
    opacity: 0.3;
    transition: opacity 0.3s ease;
  }

  button:hover,
  button:focus {
    opacity: 0.7;
  }

  .arrow {
    width: 64px;
    height: 64px;
  }

  .arrow-path {
    fill: #ffffff;
  }
</style>
