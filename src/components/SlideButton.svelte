<script lang="ts">
  import type { TSlideButton } from "../types";
  import { SlideButtonType } from "../constants";

  export let type: TSlideButton;
</script>

<button on:click>
  {type === SlideButtonType.Back ? "<" : ">"}
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
</style>
