<script lang="ts">
  import { nanoid } from 'nanoid/non-secure';
  import { cards, cardsFilter } from '@stores/cards';

  export let listId: listId;
  let title: string = '';
  let enableForm: boolean = true;
  let showInput: boolean = false;
  let inputRef: HTMLInputElement;

  function addCard() {
    enableForm = false;
    const assignedUserIds = $cardsFilter.isFiltered ? [$cardsFilter.userId] : [];
    const card = {
      title,
      listId,
      complete: false,
      assignedUserIds,
      id: nanoid(),
    };
    cards.add(card);
    inputRef.focus();
    title = '';
    enableForm = true;
  }

  function toggleInput() {
    if (!title) showInput = !showInput;
  }

  import IconPlus from './IconPlus.svelte';
  import UIButton from './UIButton.svelte';
</script>

{#if showInput}
  <form on:submit|preventDefault={addCard} on:focusout={toggleInput}>
    <input
      type="text"
      class="w-full px-4 py-3 rounded mb-3
        ease-out duration-200 transition-colors
        focus:outline-none focus:ring ring-violet-600"
      bind:value={title}
      bind:this={inputRef}
      placeholder="Add a new card…"
      autofocus
    />
    <UIButton disabled={!enableForm}>Add card</UIButton>
  </form>
{:else}
  <UIButton on:click={toggleInput} theme="secondary">
    <IconPlus class="mr-2 mb-0.5 text-inherit inline-block" />Add a card
  </UIButton>
{/if}
