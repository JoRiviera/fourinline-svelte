/// <reference types="@sveltejs/kit" />
export type Tile = 'R' | 'Y';
export type Slot = '' | Tile;
export type Board = Slot[][];
export type Move = [number,number];

