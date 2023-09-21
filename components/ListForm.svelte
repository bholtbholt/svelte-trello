<script>
  import { nanoid } from 'nanoid/non-secure';

  import IconPlus from './IconPlus.svelte';
  import UIButton from './UIButton.svelte';

  import { lists } from '@stores/lists';

  function addList() {
    lists.add({
      id: nanoid(),
      name: 'New List',
      position: $lists.length,
      cards: [],
    });
  }
</script>

<UIButton
  on:click={addList}
  theme="secondary"
  class="snap-start border border-violet-800 flex-1"
>
  <IconPlus class="mr-2 mb-0.5 text-inherit inline-block" />Add a list
</UIButton>
