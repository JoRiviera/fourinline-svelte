import type { Player } from './player.interface';
import type { Writable } from 'svelte/store';
import type {BoardState} from "$lib/types/board.interface";

export interface GameState {
  players: Player[],
  board: BoardState,
}
