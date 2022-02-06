<script lang="ts">
  export let name = '';
  import { cardsFilter } from '@stores/cards';
  import { members } from '@stores/members';

  import Member from './Member.svelte';

  function filterCards() {
    cardsFilter.set(this.value);
  }
</script>

<header class="flex items-center mb-3">
  <h1 class="text-4xl font-bold text-white">{name}</h1>
  <button on:click={() => cardsFilter.reset()} value="">Clear filter</button>
  <ul class="grid grid-cols-6 gap-1 ml-auto">
    {#each $members as member}
      <Member
        on:click={filterCards}
        class="{$cardsFilter == member.id ? 'ring bg-white' : ''}
          rounded focus:outline-none focus:ring hover:ring ring-violet-500"
        {...member}
      />
    {/each}
  </ul>
</header>
