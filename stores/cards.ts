import type { Card, CardId, List, ListId, UpdateListFn, UserId } from 'types';
import { writable } from 'svelte/store';
import { lists } from './lists';

export const cards = {
  add: (card: Card) => {
    lists.update({ id: card.listId }, addCardToList(card));
  },
  remove: (card: Card) => {
    lists.update({ id: card.listId }, removeCardFromList(card.id));
  },
  update: (card: Partial<Card>) => {
    lists.update({ id: card.listId }, updateCardInList(card));
  },
};

function addCardToList(card: Card): UpdateListFn {
  return (list: List): List => {
    list.cards.push(card);
    return list;
  };
}

function removeCardFromList(cardId: CardId): UpdateListFn {
  return (list: List): List => {
    list.cards = list.cards.filter((card) => card.id !== cardId);
    return list;
  };
}

function updateCardInList(props: Partial<Card>): UpdateListFn {
  return (list: List): List => {
    list.cards = list.cards.map((card) => {
      return card.id === props.id ? { ...card, ...props } : card;
    });
    return list;
  };
}

interface CardsFilter {
  userId: UserId;
  isFiltered: boolean;
}
export const cardsFilter = (() => {
  const initFilter: CardsFilter = {
    userId: '',
    isFiltered: false,
  };
  const { subscribe, set } = writable<CardsFilter>(initFilter);

  return {
    subscribe,
    set: (userId: UserId) => set({ userId, isFiltered: true }),
    reset: () => set(initFilter),
  };
})();

interface DNDFinalizeEvent {
  cards: Card[];
  cardId: CardId;
  listId: ListId;
}

export function moveCardsWithFilter(details: DNDFinalizeEvent): UpdateListFn {
  const { cards, cardId, listId } = details;
  const index = cards.findIndex((card) => card.id === cardId);
  const card = { ...cards[index], listId };

  return (list: List): List => {
    // Remove card from all lists that are changed from the drag and drop event
    // If the index exists in the dnd internal list, reinject the card
    // This prevent accidentally cloning the card across and within lists
    list.cards = list.cards.filter((card) => card.id !== cardId);
    if (index !== -1) list.cards.splice(index, 0, card);

    return list;
  };
}
