<script lang="ts">
  import Tile from "./Tile.svelte";
  import debug from 'debug';

  import type {Slot} from "../types";

  const log: debug.IDebugger = debug('app:column.svelte');

  export let handler: Function;
  export let column: Slot[] = [];

  $: full = column[column.length - 1] !== "";
  $: backgroundColor = full ? "lightcoral" : "lightgreen";

</script>

<div class="column" style="--bckColor:{backgroundColor}" on:click={handler}>
  {#each column as tile}
    <Tile color={tile !== "" ? (tile === "Y" ? "yellow" : "red") : ""} />
  {/each}
</div>

<style>
  .column {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: nowrap;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }

  .column:hover {
    background-color: var(--bckColor);
  }
</style>
