<script lang="ts">
  export let id;
  export let listId;
  export let title;
  export let complete = false;
  export let assignedUserIds = [];

  import { cards } from '@stores/cards';

  import Select from 'svelte-select';
  import CardAssignment from './CardAssignment.svelte';
  import IconTrash from './IconTrash.svelte';
</script>

<div id="card_{id}" class="p-2 bg-white rounded shadow space-y-2 max-w-lg">
  <header class="flex items-baseline">
    <div class="flex items-baseline">
      <input
        id="card_{id}_input"
        on:click={() => cards.update({ id, listId, complete: !complete })}
        checked={complete}
        type="checkbox"
        class="shrink-0 h-4 w-4 scale-110 origin-top-left mr-3"
      />
      <label
        for="card_{id}_input"
        class="cursor-pointer flex-1"
        class:line-through={complete}
      >
        {title}
      </label>
    </div>
    <button
      on:click={() => cards.remove({ id, listId })}
      class="shrink-0 ml-auto text-violet-200 hover:text-red-500 focus:text-red-500"
    >
      <IconTrash />
    </button>
  </header>

  <CardAssignment {...{ id, listId, complete, assignedUserIds }} />
</div>
