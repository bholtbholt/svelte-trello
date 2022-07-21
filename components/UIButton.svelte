<script>
  let className = '';
  export { className as class };
  export let disabled = false;
  export let theme = 'primary';
  const colors = {
    primary: 'text-white bg-violet-600',
    secondary: 'text-violet-800 bg-transparent hover:text-white focus:text-white',
  };

  import UISpinner from './UISpinner.svelte';
</script>

<button
  on:click
  {disabled}
  class:opacity-75={disabled}
  class:cursor-not-allowed={disabled}
  class="{colors[theme] || colors.primary} {className}
    hover:bg-violet-800 focus:bg-violet-800
    focus:outline-none focus:ring ring-violet-500
    rounded-lg px-3 py-2
    text-center whitespace-nowrap
    ease-out duration-200 transition-colors"
>
  <slot />
  {#if disabled}
    <UISpinner class="ml-1 mb-0.5 text-inherit inline-block" size="1em" />
  {/if}
</button>
