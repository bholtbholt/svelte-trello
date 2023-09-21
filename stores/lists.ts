import type { List, ListId, UpdateListFn } from 'types';
import { writable, derived } from 'svelte/store';
import { cards, cardsFilter } from './cards';

export const lists = (() => {
  const { subscribe, set, update } = writable<List[]>([]);

  function defaultUpdate(props: Partial<List>): UpdateListFn {
    return (list: List): List => {
      return { ...list, ...props };
    };
  }

  return {
    subscribe,
    reset: () => set([]),
    set: (lists: List[]) => {
      const ordered = lists.sort((a, b) => a.position - b.position);
      set(ordered);
    },
    add: (list: List) => {
      update((lists: List[]) => {
        lists.push(list);
        return lists;
      });
    },
    remove: (listId: ListId) => {
      update((lists: List[]) => lists.filter((list) => list.id !== listId));
    },
    update: (props: Partial<List>, fn: UpdateListFn = defaultUpdate(props)) => {
      update((lists: List[]) => {
        return lists.map((list) => (list.id === props.id ? fn(list) : list));
      });
    },
  };
})();

export const filteredLists = derived([lists, cardsFilter], ([$lists, $filter]) => {
  const { userId, isFiltered } = $filter;
  return isFiltered ? cardFilter($lists, userId) : $lists;
});

function cardFilter(lists, userId) {
  return lists.map((list) => {
    return {
      ...list,
      cards: list.cards.filter((card) => card.assignedUserIds.includes(userId)),
    };
  });
}
