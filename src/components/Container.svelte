<div class="container">
  <div class="container-inner">
    <slot />
  </div>
</div>

<style>
  .container {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 15px;
  }

  .container-inner {
    width: 100%;
    max-width: 900px;
  }

  @media (min-width: 480px) {
    .container {
      padding: 24px;
    }
  }
</style>
