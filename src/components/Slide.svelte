<script lang="ts">
  export let hide: boolean = false;
</script>

<div class={hide ? "slide hide" : "slide"}>
  <slot />
</div>

<style>
  .slide {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    opacity: 1;
    z-index: 1;
    line-height: 1.3em;
    font-size: 14px;
    transition: opacity 0.8s ease;
    color: #2a2a57;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 15px 24px;
    text-align: justify;
  }

  .hide {
    opacity: 0;
    z-index: 0;
  }

  @media (min-width: 780px) {
    .slide {
      border-radius: 10px;
      min-height: 50vh;
      max-height: 400px;
      padding: 24px;
      font-size: 16px;
      line-height: 1.5em;
    }
  }
</style>
