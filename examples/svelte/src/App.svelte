<script lang="ts">
  import Counter from './lib/Counter.svelte';
  let counterComponent
</script>

<main>
  <div class="logo-wrapper">
    <img src="./images/logo.svg" alt="Svelte">
  </div>
  <button on:click={() => counterComponent.increment()} >Increment with another button</button>
  <Counter bind:this = {counterComponent}/>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  .logo-wrapper {
    padding-bottom: 20px;
  }

  img {
    height: 10rem;
    width: 10rem;
  }

</style>
