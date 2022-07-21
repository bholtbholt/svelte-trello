<script lang="ts">
  import { nanoid } from 'nanoid/non-secure';
  import { members } from '@stores/members';

  import Member from './Member.svelte';
  import IconTrash from './IconTrash.svelte';
  import UIDrawer from './UIDrawer.svelte';
  import UIButton from './UIButton.svelte';

  // prettier-ignore
  const avatars = [
    '🐶','🐱','🦊','🐯','🦁','🐸','🐼','🐨',
    '🐵','🐻','🐹','🐰','🐷','🐙','🌞','👹',
  ];
  let name;
  let pic;
  let editing = false;
  let enableForm = true;

  function addMember() {
    enableForm = false;
    members.add({
      id: nanoid(),
      name,
      pic,
    });
    name = '';
    pic = '';
    enableForm = true;
  }

  function toggleEditing() {
    editing = !editing;
  }
</script>

<UIDrawer class="text-gray-600 bg-white p-3 pb-6">
  <header class="flex items-baseline mb-2">
    <h4 class="text-xl font-bold">
      {editing ? 'Remove Members' : 'Players'}
    </h4>
    <button
      title="Remove player"
      type="button"
      on:click={toggleEditing}
      class="block ml-auto
        text-gray-500 hover:underline focus:underline"
    >
      {editing ? 'Done' : 'Edit'}
    </button>
  </header>

  <ul class="space-y-1 mb-5">
    {#each $members as member}
      <li class="flex">
        {#if editing}
          <button
            on:click={() => members.remove(member.id)}
            class="shrink-0 mr-2 text-gray-300 hover:text-red-500 focus:text-red-500"
          >
            <IconTrash />
          </button>
        {/if}
        <Member {...member} class="w-full" />
      </li>
    {/each}
  </ul>

  <form class="p-3 pb-8 bg-violet-100 -mx-3" on:submit|preventDefault={addMember}>
    <h4 class="text-xl font-bold mb-2">Add a member</h4>
    <div class="mb-5">
      <label for="name" class="block mb-1">Name</label>
      <input
        id="name"
        name="name"
        bind:value={name}
        type="text"
        class="border rounded w-full py-1 px-2"
        autocomplete="off"
        required
      />
    </div>

    <label class="block mb-1">Avatar</label>
    <div class="grid grid-cols-8 gap-1 mb-8">
      {#each avatars as avatar, i}
        <label
          for="avatar_{i}"
          class="relative rounded-lg
            ease-out duration-200 transition-colors
            text-center text-3xl"
          class:ring-violet-400={avatar === pic}
          class:ring={avatar === pic}
        >
          <input
            id="avatar_{i}"
            class="absolute bottom-0 right-0 opacity-0"
            type="radio"
            bind:group={pic}
            name="avatar"
            value={avatar}
            required
          />
          {avatar}
        </label>
      {/each}
    </div>

    <UIButton disabled={!enableForm}>Add Member</UIButton>
  </form>
</UIDrawer>
