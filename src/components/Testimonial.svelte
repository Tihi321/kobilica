<script lang="ts">
  export let name: string;
  export let position: string;
  export let company: string;
</script>

<div class="testimonial">
  <div class="name">{name}</div>
  <div class="position">{position}</div>
  <div class="company">{company}</div>
</div>

<style>
  .testimonial {
    padding-top: 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .position {
    font-size: 16px;
    font-style: italic;
    font-weight: 100;
  }

  .company {
    font-weight: 700;
  }
</style>
