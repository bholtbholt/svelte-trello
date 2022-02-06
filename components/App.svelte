<script lang="ts">
  let name = '';

  import { onMount } from 'svelte';

  import { members } from '@stores/members';
  import { lists, filteredLists } from '@stores/lists';

  import BoardHeader from './BoardHeader.svelte';
  import List from './List.svelte';

  onMount(async () => {
    const response = await fetch('data.json');
    const data = await response.json();

    name = data.name;
    members.set(data.members);
    lists.set(data.lists);
  });
</script>

<BoardHeader {name} />
<main id="lists" class="flex gap-2 items-start">
  {#each $filteredLists as { id, name, cards }}
    <List {id} {name} {cards} />
  {/each}
</main>
