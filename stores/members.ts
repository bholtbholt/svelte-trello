import type { User, UserId } from 'types';
import { writable } from 'svelte/store';

export const members = (() => {
  const { subscribe, set, update } = writable<User[]>([]);

  return {
    subscribe,
    set,
    reset: () => set([]),
    add: (member: User) => {
      update((members: User[]) => {
        members.push(member);
        return members;
      });
    },
    remove: (memberId: UserId) => {
      update((members: User[]) => members.filter((member) => member.id !== memberId));
    },
  };
})();
