<script lang="ts">
  export let color = "none";
</script>

<div class="tile" style="background-color: {color ? color : 'white'};" ></div>

<style>
  .tile {
    width: 100%;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
  }
</style>
