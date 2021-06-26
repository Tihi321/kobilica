<script lang="ts">
  import Slider from "./components/Slider.svelte";
  import Header from "./components/Header.svelte";
</script>

<main>
  <Header />
  <Slider />
</main>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
