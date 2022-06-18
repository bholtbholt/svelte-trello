<script lang="ts">
  export let name = '';
  import { cardsFilter } from '@stores/cards';
  import { members } from '@stores/members';

  import MemberForm from './MemberForm.svelte';
  import Select from 'svelte-select';

  function filterCards(event) {
    const { detail: member } = event;
    cardsFilter.set(member.id);
  }
</script>

<header class="flex items-center mb-3">
  <MemberForm />
  <h1 class="text-4xl font-bold text-white ml-2 mr-auto truncate">{name}</h1>
  <Select
    id="memberFilter"
    items={$members}
    on:select={filterCards}
    on:clear={() => cardsFilter.reset()}
    optionIdentifier="id"
    labelIdentifier="name"
    getOptionLabel={(option) => `${option.pic} ${option.name}`}
    getSelectionLabel={(option) => {
      if (option) return `${option.pic} ${option.name}`;
    }}
    hideEmptyState={true}
    isSearchable={false}
    placeholder="Filter cards…"
    containerClasses="relative min-w-[10em] min-h-[2.25em]"
    containerStyles="--border: 2px solid rgb(167 139 250);
      --borderRadius: 0.5rem;
      --borderFocusColor: rgb(109 40 217);
      --borderHoverColor: rgb(109 40 217);
      --internalPadding: 0 0.5rem;
      --height: 1.8;
      --background: rgba(255, 255, 255, .9);
      --inputPadding: 0 0.75rem;
      --indicatorTop: 0.25rem;
      --clearSelectTop: 0.25rem;
      --clearSelectBottom: 0.2rem;
      --clearSelectWidth: 1rem;
      --itemPadding: 0.25rem 0.5rem;
      --listBackground: rgba(255, 255, 255, .9);
      --itemHoverBG: rgb(221 214 254);
      --listShadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);"
  />
</header>
