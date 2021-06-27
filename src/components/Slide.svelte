<script lang="ts">
  export let hide: boolean = false;
</script>

<div class={hide && "hide"}>
  <slot />
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    opacity: 1;
    z-index: 1;
    transition: opacity 0.8s ease;
    line-height: 1.5em;
    font-size: 16px;
    color: #2a2a57;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 24px;
    text-align: justify;
  }

  .hide {
    opacity: 0;
    z-index: 0;
  }

  @media (min-width: 780px) {
    div {
      border-radius: 10px;
    }
  }
</style>
