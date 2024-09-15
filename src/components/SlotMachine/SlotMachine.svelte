<script>
    import { Application, Text } from 'svelte-pixi'
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import Reel from '../Reel/Reel.svelte';
    import Message from '../Message/Message.svelte';
    import spinButtonImage from '../../assets/spin.png';

    import {
        balance, 
        bet, 
        win, 
        winMessage, 
        isSpinning, 
        bonusGameActive, 
        respins, 
        reelSymbols, 
        winningPositions, 
        spinReels, 
        handleBonusSpin, 
        decreaseBet, 
        increaseBet, 
        MIN_BET, 
        MAX_BET
    } from './SlotMachine.utils.ts';

    let containerWidth = 800;
    let containerHeight = 500;
    let gameContainer; 

    function updateContainerSize() {
        if (gameContainer) {
            containerWidth = gameContainer.clientWidth;
            containerHeight = gameContainer.clientHeight;
        }
    }

    onMount(() => {
        updateContainerSize();
        window.addEventListener('resize', updateContainerSize);
        return () => window.removeEventListener('resize', updateContainerSize);
    });
</script>

<div bind:this={gameContainer} class="game-container">
    <Application width={containerWidth} height={containerHeight}>
        <Text
            text="3x3"
            anchor={0.5}
            x={containerWidth / 2}
            y={40}
            style={{
                fill: 'yellow',
                fontSize: '80px',
                fontWeight: '700',
            }}
        />
    </Application>
    <div class="reels">
        {#each $reelSymbols as reelSymbols, reelIndex}
            <Reel symbols={reelSymbols} isSpinning={$isSpinning} winningPositions={$winningPositions} reelIndex={reelIndex} />
        {/each}
        {#if $winMessage}
            <Message text={$winMessage} />
        {/if}
    </div>

    <button class="spin-button" disabled={$isSpinning} on:click={$bonusGameActive ? handleBonusSpin : spinReels}>
        <img src={spinButtonImage} class="spin-icon {$isSpinning ? 'spinning' : ''}" alt='Spin Button' />

        {#if $bonusGameActive}
            <p class='respins'>{$respins}</p>
            <p class='respins-label'>RESPINS</p>
        {/if}
    </button>

    <div class="interface">
        <div class="centered-col">WIN <p>{$win}</p></div>
        <div class="bet">
            <button class="button" disabled={!($bet > MIN_BET) || $isSpinning || $bonusGameActive} on:click={decreaseBet}>-</button>
            <div class="centered-col">BET <p>{$bet}</p></div>
            <button class="button" disabled={!($bet < MAX_BET) || $isSpinning || $bonusGameActive} on:click={increaseBet}>+</button>
        </div>
        <div class="centered-col">BALANCE <p>{$balance}</p></div>
    </div>
</div>

<style>
    .game-container {
        overflow: hidden;
        max-width: fit-content;
        position: relative;
        font-family: Arial;
    }

    .centered-col {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bet {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .reels {
        display: flex;
        gap: 10px;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .button {
        cursor: pointer;
        font-size: 24px;
        width: 40px;
        height: 40px;
        padding: 0;
        border: 0;
        background: #fff;
    }

    .button:not([disabled]):hover {
        background: yellow;
    }

    .interface {
        width: 100%;
        padding-top: 10px;
        justify-content: center;
        color: white;
        display: flex;
        background: rgb(0,0,0);
        background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(255,255,255,0.5) 80%, rgba(255,255,255,0.6) 100%);
        border-top: 1px solid white;
        gap: 40px;
        position: absolute;
        bottom: 4px;
    }

    .spin-button {
        display: flex;
        position: absolute;
        top: 40%;
        right: 10px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: rgba(255,255,255,0.3);
        border: 2px solid white;
        width: 120px;
        height: 120px;
        border-radius: 60px;
        transition: background-color 0.3s ease;
        z-index: 10;
        overflow: hidden;
    }

    .spin-button:hover {
        background: rgba(255,255,0,0.9);
    }

    .spin-icon {
        width: 110px;
    }

    .respins {
        position: absolute;
        color: white;
        margin: 0;
        font-weight: 700;
        font-size: 24px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .respins-label {
        position: absolute;
        text-align: center;
        width: 150px;
        bottom: 5px;
        z-index: 1;
        background: white;
        color: black;
        font-weight: 700px;
        font-size: 16px;
        margin: 0;
    }

    .spin-icon.spinning {
        animation: spin 0.5s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

