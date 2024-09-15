<script>
    export let symbols = [];
    export let isSpinning = false;
    export let winningPositions = [];
    export let reelIndex;

    let displaySymbols = [];

    function isWinningSymbol(index) {
        // Calculate the global index of the symbol based on its reel index
        const globalIndex = reelIndex * 3 + index;
        return winningPositions.includes(globalIndex);
    }
</script>

<div class="reel-container">
    <div class="reel" class:isSpinning>
        {#each symbols as symbol, index (index)}
            <div class="symbol" key={index} class:winning={isWinningSymbol(index)}>{symbol}</div>
        {/each}
    </div>
</div>

<style>
    .reel-container {
        overflow: hidden;
        width: 100px;
        height: 300px;
        border: 2px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .reel {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .symbol {
        font-size: 48px;
        line-height: 64px;
        padding: 20px;
        text-align: center;
        width: 100%;
    }

    .symbol.winning {
        background-color: yellow;
        animation: fontPulse 1s ease-in-out infinite;
    }

    @keyframes fontPulse {
        0% {
            font-size: 48px;
        }
        50% {
            font-size: 60px;
        }
        100% {
            font-size: 48px;
        }
    }

    .reel.isSpinning {
        animation: spin 0.2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-50%);
        }
    }
</style>
