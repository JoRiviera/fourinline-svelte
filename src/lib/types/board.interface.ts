import type { Writable } from "svelte/store";
import type {Player} from "$lib/types/player.interface";

export interface Turn{
    player: Player,
    move: Move,
    board: Board,
    freeSlots: number,
}

export interface BoardState{
    height: number,
    width: number,
    memory: Turn[],
    current: Turn,
    players: IterableIterator<Player>,
    nextPlayer: () => Player,
}

