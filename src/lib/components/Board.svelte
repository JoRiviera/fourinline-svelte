<script lang="ts">
    import Column from './Column.svelte';
    import {ST_board, ST_state, ST_players} from "../stores/game";
    import debug from 'debug';
    import {boardUtils} from "../types/boardutils.class";

    const log: debug.IDebugger = debug('app:board.svelte');

    function handleClick(col: number){
        return () => {
            const move = boardUtils.moveIsValid($ST_board, col);
            if (move) {
                $ST_state = boardUtils.nextTurn($ST_state, move);
            }
        }
    }
</script>

<div class="board">
    {#each $ST_board as column, i}
        <Column column="{column}" handler={handleClick(i)}/>
    {/each}
</div>

<style>
    .board {
        display : flex;
        flex-direction : row;
        flex-wrap : nowrap;
        margin-left: auto;
        margin-right: auto;
        padding : 1em 2em 2em;
        border-radius : 10%;
        background-color : dimgray;
    }
</style>
