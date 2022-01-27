import { writable } from 'svelte/store';

export const count = (() => {
  const { subscribe, set, update } = writable<number>(1000);

  return {
    subscribe,
    add: () => update((n) => n + 10),
    subtract: () => update((n) => n - 10),
    reset: () => set(1000),
  };
})();
