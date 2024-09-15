import { get, writable, type Writable } from "svelte/store";

export const MIN_BET: number = 5;
export const MAX_BET: number = 50;

let winAmount: number = 0;
const emojiSymbols: string[] = ['🍒', '🍋', '⭐', '🔔', '🪙'];

const multipliers: { [key: string]: number } = {
    '🍒': 1,
    '🍋': 2,
    '⭐': 3,
    '🔔': 5,
    '🪙': 0,
};

export const reelSymbols: Writable<string[][]> = writable([
    ['🍒', '🍋', '⭐'],
    ['🍒', '🍋', '⭐'],
    ['🍒', '🍋', '⭐']
]);

export const balance: Writable<number> = writable(1000);
export const bet: Writable<number> = writable(5);
export const win: Writable<number> = writable(0);
export const winMessage: Writable<string> = writable('');
export const isSpinning: Writable<boolean> = writable(false);
export const bonusGameActive: Writable<boolean> = writable(false);
export const respins: Writable<number> = writable(3);
export const collectedValues: Writable<number[]> = writable([]);
export const winningPositions: Writable<number[]> = writable([]);

// Spin reels function
export function spinReels(): void {
    winMessage.set('');
    balance.update(b => b - get(bet));
    win.set(0);
    isSpinning.set(true);
    winningPositions.set([]);

    const newSymbols: string[][] = [
        // First reel: Only non-Coin emojis
        Array.from({ length: 3 }, () => getRandomSymbol()),

        // Second reel: Contains Coins and other emojis
        Array.from({ length: 3 }, () => getRandomSymbol(true)),

        // Third reel: Only non-Coin emojis
        Array.from({ length: 3 }, () => getRandomSymbol())
    ];

    reelSymbols.set([
        ['🍒', '🍋', '⭐', '🔔'],
        ['🍋', '⭐', '🔔', '🍒'],
        ['⭐', '🔔', '🍒', '🍋']
    ]);

    setTimeout(() => {
        reelSymbols.set(newSymbols);
        checkWin();
        checkBonus();
        isSpinning.set(false);
    }, 3000);
}

// Function to get random symbol
function getRandomSymbol(shouldRenderCoins: boolean = false): string {
    return emojiSymbols[
        Math.floor(Math.random() * (shouldRenderCoins ? emojiSymbols.length : emojiSymbols.length - 1))
    ];
}

// Function to check for winning positions
function checkWin(): void {
    winAmount = 0;
    const winning: number[] = [];

    // Check the horizontal wins
    for (let row = 0; row < 3; row++) {
        if (get(reelSymbols)[0][row] === get(reelSymbols)[1][row] && get(reelSymbols)[1][row] === get(reelSymbols)[2][row]) {
            const symbol: string = get(reelSymbols)[0][row];
            winAmount += get(bet) * multipliers[symbol];
            winMessage.set(`You win! x${multipliers[symbol]}`);
            win.set(winAmount);
            balance.update(b => b + winAmount);
            winning.push(row, row + 3, row + 6);
        }
    }

    // Check the diagonal wins
    if (get(reelSymbols)[0][0] === get(reelSymbols)[1][1] && get(reelSymbols)[1][1] === get(reelSymbols)[2][2]) {
        const symbol: string = get(reelSymbols)[0][0];
        winAmount += get(bet) * multipliers[symbol];
        winMessage.set(`You win! x${multipliers[symbol]}`);
        win.set(winAmount);
        balance.update(b => b + winAmount);
        winning.push(0, 4, 8);
    }

    if (get(reelSymbols)[0][2] === get(reelSymbols)[1][1] && get(reelSymbols)[1][1] === get(reelSymbols)[2][0]) {
        const symbol: string = get(reelSymbols)[0][2];
        winAmount += get(bet) * multipliers[symbol];
        winMessage.set(`You win! x${multipliers[symbol]}`);
        win.set(winAmount);
        balance.update(b => b + winAmount);
        winning.push(2, 4, 6);
    }

    winningPositions.set(winning);
}

// Function to check for bonus game
export function checkBonus(): void {
    const middleReel: string[] = get(reelSymbols)[1];
    const coins: number = middleReel.filter(symbol => symbol === '🪙').length;

    if (coins >= 3) {
        bonusGameActive.set(true);
        respins.set(3);
        collectedValues.set([]);
        winMessage.set(`Bonus Game!`)
    }
}

// Spin function for bonus game
export function handleBonusSpin(): void {
    if (get(respins) > 0 && get(bonusGameActive)) {
        winMessage.set('');
        winningPositions.set([]);
        isSpinning.set(true);

        const newSymbols: string[][] = [
            Array.from({ length: 3 }, () => getRandomSymbol(true)),
            Array.from({ length: 3 }, () => '🪙'),
            Array.from({ length: 3 }, () => getRandomSymbol(true))
        ];

        setTimeout(() => {
            reelSymbols.set(newSymbols);
            isSpinning.set(false);
            const coinsInView: number = get(reelSymbols).flat().filter(symbol => symbol === '🪙').length;

            if (coinsInView > 3) {
                respins.set(3);
                collectedValues.update(values => [...values, ...Array(coinsInView).fill(get(bet))]);

                const winning: number[] = [];
                for (let reelIndex = 0; reelIndex < get(reelSymbols).length; reelIndex++) {
                    for (let rowIndex = 0; rowIndex < get(reelSymbols)[reelIndex].length; rowIndex++) {
                        if (get(reelSymbols)[reelIndex][rowIndex] === '🪙') {
                            winning.push(reelIndex * 3 + rowIndex);
                        }
                    }
                }
                winningPositions.set(winning);
            } else {
                respins.update(r => r - 1);
            }

            if (get(respins) === 0) {
                endBonusGame();
            }
        }, 3000);

        reelSymbols.set(newSymbols);
    }
}

// Function to end the bonus game
function endBonusGame(): void {
    bonusGameActive.set(false);
    const totalCollected: number = get(collectedValues).reduce((acc, value) => acc + value, 0);
    win.set(totalCollected);
    balance.update(b => b + totalCollected);
    collectedValues.set([]);
    winMessage.set(`Collected: ${totalCollected}`);
}

export function increaseBet(): void {
    bet.update(b => b + 5);
}

export function decreaseBet(): void {
    bet.update(b => b - 5);
}
