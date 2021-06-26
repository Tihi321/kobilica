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
    color: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 1;
    transition: opacity 1s ease;
    line-height: 1.5em;
    font-size: 18px;
  }

  .hide {
    opacity: 0;
    z-index: 0;
  }
</style>
