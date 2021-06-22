<script lang="ts">
  import logo from "../assets/logo.png";
</script>

<header>
  <img src={logo} alt="Svelte Logo" />
  <h2>Kobilica</h2>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 {
    color: #ffffff;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  img {
    max-width: 150px;
  }

  @media (min-width: 780px) {
    h2 {
      font-size: 4rem;
    }
  }
</style>
