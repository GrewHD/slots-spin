<script>
    import SlotMachine from '../components/SlotMachine/SlotMachine.svelte';
    import { onMount } from 'svelte';

    let isClient = false;

    // Ensure rendering happens only on the client-side
    onMount(() => {
        isClient = true;
    });
</script>

{#if isClient}
    <SlotMachine />
{/if}
