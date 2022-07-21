<script lang="ts">
  export let id;
  export let name;
  export let cards: Card[] = [];
  const flipDurationMs = 150;

  import { cardsFilter, moveCardsWithFilter } from '@stores/cards';
  import { lists } from '@stores/lists';
  import Card from './Card.svelte';
  import CardForm from './CardForm.svelte';

  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';

  function handleConsider(event) {
    cards = event.detail.items;
  }

  function handleFinalize(event) {
    const { detail } = event;
    if ($cardsFilter.isFiltered) {
      const updateFilteredList = moveCardsWithFilter({
        cards: detail.items,
        cardId: detail.info.id,
        listId: id,
      });
      lists.update({ id }, updateFilteredList);
    } else {
      lists.update({ id, cards: detail.items });
    }
  }

  function transformDraggedElement(draggedEl) {
    draggedEl.firstElementChild.classList.add('-rotate-3', 'shadow-xl');
  }
</script>

<div
  id="list_{id}"
  class="snap-start rounded-lg p-2
    inline-block w-[300px]
    bg-violet-300 shadow-lg"
>
  <h2 class="text-lg font-bold mb-3">{name}</h2>
  <div
    class="space-y-2 mb-2 min-h-[2rem]"
    use:dndzone={{
      items: cards,
      flipDurationMs,
      dropTargetStyle: {},
      transformDraggedElement,
    }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
  >
    {#each cards as card (card.id)}
      <div class="relative outline-none" animate:flip={{ duration: flipDurationMs }}>
        <Card
          id={card.id}
          listId={id}
          title={card.title}
          complete={card.complete}
          assignedUserIds={card.assignedUserIds}
        />
        {#if card[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
          <div class="visible absolute inset-0 bg-violet-400 rounded" />
        {/if}
      </div>
    {/each}
  </div>
  <div class:-mt-8={!cards.length}>
    <CardForm listId={id} />
  </div>
</div>
