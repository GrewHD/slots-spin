import type { Meta, StoryObj } from '@storybook/svelte';

import SlotMachine from './SlotMachine.svelte';

const meta = {
  title: 'Components/SlotMachine',
  component: SlotMachine,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Slot Machine Component

This component simulates a slot machine game with the following features:

1. **Reels and Symbols**: 
   - The game contains a 3x3 grid with symbols like 🍒, 🍋, ⭐, 🔔, and 🪙 (Coin).
   
2. **Betting and Spinning**: 
   - Players place bets and spin the reels. The goal is to match symbols on horizontal or diagonal lines to win.

3. **Bonus Game**:
   - A bonus game is triggered when 3 🪙 symbols land on the middle reel, offering 3 respins.
   - During the bonus game, 🪙 symbols stick in place, and the respins reset to 3 every time a new 🪙 lands.
   - The player collects all values from the 🪙 symbols at the end of the bonus game.

4. **Winning and Multipliers**:
   - Different symbols offer different multipliers to calculate wins based on the player's bet.
   - 🍒 - x1
   - 🍋 - x2
   - ⭐ - x3
   - 🔔 - x5
   - 🪙 - Bonus Game

Use this component to simulate a simple slot machine game with bonus rounds and respins.
        `,
      },
    },
  },
} satisfies Meta<SlotMachine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
