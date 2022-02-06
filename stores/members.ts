import type { User, UserId } from 'types';
import { writable } from 'svelte/store';

export const members = (() => {
  const { subscribe, set, update } = writable<User[]>([]);

  return {
    subscribe,
    set,
    reset: () => set([]),
  };
})();
