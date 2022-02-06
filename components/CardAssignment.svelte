<script lang="ts">
  export let id;
  export let listId;
  export let complete = false;
  export let assignedUserIds = [];

  import { members } from '@stores/members';
  import { cards } from '@stores/cards';

  let select;
  import Select from 'svelte-select';
  import Member from './Member.svelte';

  // partition members into groups
  $: [assigned, unassigned] = $members.reduce(
    (groups, member) => {
      const key = assignedUserIds.includes(member.id) ? 0 : 1;
      groups[key].push(member);
      return groups;
    },
    [[], []],
  );

  function addMember(event) {
    const { detail: member } = event;
    assignedUserIds = [...assignedUserIds, member.id];
    cards.update({ id, listId, assignedUserIds });
    select.handleClear();
  }

  function removeMember() {
    const memberId = this.value;
    assignedUserIds = assignedUserIds.filter((id) => id !== memberId);
    cards.update({ id, listId, assignedUserIds });
  }
</script>

<div
  class="flex flex-wrap items-center
    empty:hidden rounded -mx-0.5
    focus-within:ring ring-violet-400 ring-offset-2"
>
  {#each assigned as member}
    {#if complete}
      <Member class="m-0.5 text-sm" {...member} />
    {:else}
      <Member
        on:click={removeMember}
        class="m-0.5 text-sm
          focus:outline-none focus:ring hover:ring ring-violet-500"
        {...member}
      />
    {/if}
  {/each}
  {#if !complete && unassigned.length}
    <Select
      items={unassigned}
      bind:this={select}
      on:select={addMember}
      hideEmptyState={true}
      getOptionLabel={(option) => `${option.pic} ${option.name}`}
      placeholder="Assign to…"
      containerClasses="inline-block relative min-w-[7em] min-h-[1.8em]"
      containerStyles="--border: 0;
        --padding: 0;
        --height: 1.8;
        --itemPadding: 0.25rem 0.5rem;
        --inputPadding: 0.25rem;
        --listBackground: rgba(255, 255, 255, .9);
        --itemHoverBG: rgb(221 214 254);
        --listShadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);"
    />
  {/if}
</div>
