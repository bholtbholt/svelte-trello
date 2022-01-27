<script lang="ts">
  import { count } from '../stores/count';
  import UIButton from './UIButton.svelte';
</script>

<div
  class="tabular-nums text-7xl
    rounded-xl px-6 py-12 mb-6
    text-lime-800 bg-lime-200 border border-lime-800"
>
  {$count}
</div>

<div class="flex gap-2 px-3 mb-12">
  <UIButton on:click={count.reset} theme="secondary" class="mr-auto">Reset</UIButton>
  <UIButton on:click={count.subtract}
    ><svg
      aria-label="Subtract"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      class="h-6 w-4"
      ><path
        fill="currentColor"
        d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"
      /></svg
    ></UIButton
  >
  <UIButton on:click={count.add}>
    <svg
      aria-label="Add"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      class="h-6 w-4"
      ><path
        fill="currentColor"
        d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
      /></svg
    >
  </UIButton>
</div>
