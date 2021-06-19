import { Writable, writable, derived, Readable } from "svelte/store";
import type { Player } from '$lib/types/player.interface'
import type {BoardState} from "$lib/types/board.interface";
import {boardUtils} from "$lib/types/boardutils.class";
import {debug} from 'debug';
import type {Board} from "../types";

const log: debug.IDebugger = debug('app:game.ts');

let players: Player[] = [{
    id: "qwerty",
    pseudo: "Guirito",
    score: 0,
    tile: "Y"
},{
    id: "azerty",
    pseudo: "Nerita",
    score: 0,
    tile: "R"
}]

export let ST_players: Writable<Player[]> = writable(players);

export let ST_state: Writable<BoardState> = writable(boardUtils.newGameBoard(6,7, players));

export let ST_board: Readable<Board> = derived(ST_state, $state => $state.current.board);

export let ST_currPlayer: Readable<Player> = derived(ST_state, $state => $state.current.player);
log('Store is set.');
