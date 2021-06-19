<script lang="ts">
    function handleClick(num){
        return () => window.alert(num);
    }
</script>
<div>
    <h1> Hello World !</h1>
    <button on:click={handleClick(12)}>Click Me</button>
</div>
