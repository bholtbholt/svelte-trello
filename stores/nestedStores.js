// $list has a nested structure like:
// lists: [
//   {
//     "id": "TODO-ns88qrJDVXizlF0l",
//      …properties omitted for brevity
//     "cards": [
//       {
//         "id": "6OPzS6B6WoBT0J_EGqUEy",
//         "listId": "TODO-ns88qrJDVXizlF0l",
//          …properties omitted for brevity
//       },
//       …etc
//     ]
//   },
//   …etc
// ]
//
// It's difficult to add/remove/update cards, and they can't
// be pulled into a seperate store because reasons (in this
// particular case because drag and drop diffing requires a
// strict structure)
//
// We can make use of currying to create a $cards-like API
// for accessing it through lists. Example below:

// Relatively standard writeable store for modifying arrays
export const lists = (() => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    set,
    add: (list) => {
      update((lists) => {
        lists.push(list);
        return lists;
      });
    },
    remove: (listId) => {
      update((lists) => lists.filter((list) => list.id !== listId));
    },
    // Update takes any number of list props and spreads them over the
    // existing props when it's found the correct list within the array.
    // All other lists are unmodified.
    // Returns an updated array of lists.
    update: (props) => {
      update((lists) => {
        return lists.map((list) => (list.id === props.id ? { ...list, ...props } : list));
      });
    },
  };
})();

// Extracting cards into its own writable store creates multiple versions
// of truth and complex derived stores that need to both extract and reinsert
// cards back into the lists. It's circular and hard to work with.
//
// What do we want from $cards? 1. Reactivity + 2. A clean accessor API
// We already have reactivity within $lists, so let's make the API.
//
// If we had $cards, we'd create $cards.add(card) to push to the array.
// We can create a similar structure with a plain object, cards.add(card):
export const cards = {
  add: (card) => {
    // Instead of calling update from the $card writeable store, we access
    // $lists, passing in the list ID, and a function that takes the card
    lists.update({ id: card.listId }, addCardToList(card));
  },
};

// The function that takes the card returns another function that takes the
// list. This defers _which_ list is being worked on until $list.update is
// actually running.
function addCardToList(card) {
  // To add, we push the card to the list and return the entire list
  return (list) => {
    list.cards.push(card);
    return list;
  };
}

// Now we need to update $lists.update to take a function as a second argument
// (Internals have been omitted for brevity, these are the changes)
export const lists = (() => {
  // We could make the second argument conditional, but it's expensive and clunky
  // to check during every map iteration during update. Instead, we'll create a
  // function similar to addCardToList and set it as the default second argument.

  // Before we used { ...list, ...props }, so we wrap that
  function defaultUpdate(props) {
    return (list) => {
      return { ...list, ...props };
    };
  }

  return {
    // Add the second argument and assign defaultUpdate as the default. In
    // JavaScript earlier arguments can be used in later arguments so we
    // get to pass props into the function and invoke it immediately.
    // We're left with in internal function that takes a list and spreads
    // the props.
    update: (props, fn = defaultUpdate(props)) => {
      update((lists) => {
        // Now replace the spread with the function that takes a list
        return lists.map((list) => (list.id === props.id ? fn(list) : list));
      });
    },
  };
})();

// You can repeat the process for any nested attribute, building an API
// that is easier to consume in your components
//
// Make sure your curried functions return the expected type. In this case,
// each inner-function should return a _list_

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// Finished code:

export const lists = (() => {
  const { subscribe, set, update } = writable([]);

  function defaultUpdate(props) {
    return (list) => {
      return { ...list, ...props };
    };
  }

  return {
    subscribe,
    set,
    reset: () => set([]),
    add: (list) => {
      update((lists) => {
        lists.push(list);
        return lists;
      });
    },
    remove: (listId) => {
      update((lists) => lists.filter((list) => list.id !== listId));
    },
    update: (props, fn = defaultUpdate(props)) => {
      update((lists) => {
        return lists.map((list) => (list.id === props.id ? fn(list) : list));
      });
    },
  };
})();

export const cards = {
  add: (card) => {
    lists.update({ id: card.listId }, addCardToList(card));
  },
  remove: (card) => {
    lists.update({ id: card.listId }, removeCardFromList(card.id));
  },
  update: (card) => {
    lists.update({ id: card.listId }, updateCardInList(card));
  },
};

function addCardToList(card) {
  return (list) => {
    list.cards.push(card);
    return list;
  };
}

function removeCardFromList(cardId) {
  return (list) => {
    list.cards = list.cards.filter((card) => card.id !== cardId);
    return list;
  };
}

function updateCardInList(props) {
  return (list) => {
    list.cards = list.cards.map((card) => {
      return card.id === props.id ? { ...card, ...props } : card;
    });
    return list;
  };
}
