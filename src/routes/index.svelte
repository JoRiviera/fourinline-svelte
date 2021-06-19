<script lang="ts">
    import Board from "../lib/components/Board.svelte";
    import {ST_currPlayer} from "../lib/stores/game";


</script>
<h1>{$ST_currPlayer.pseudo}, your turn.</h1>
<div class="board-container">
    <Board/>
</div>

<style>
    .board-container{
        display: flex;
    }
</style>
