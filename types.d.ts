export type nanoId = string;
export type BoardId = nanoId;
export interface Board {
  id: BoardId;
  name: string;
  lists: List[];
  members: User[];
}

export type ListId = nanoId;
export interface List {
  id: ListId;
  name: string;
  position: number;
  cards: Card[];
}
export type UpdateListFn = (list: List) => List;

export type UserId = nanoId;
export interface User {
  id: UserId;
  name: string;
  pic: string;
}

export type CardId = nanoId;
export interface Card {
  id: CardId;
  title: string;
  complete: boolean;
  listId: ListId;
  assignedUserIds: UserId[];
}
