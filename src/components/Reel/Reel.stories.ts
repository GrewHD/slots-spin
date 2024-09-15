import type { Meta, StoryObj } from '@storybook/svelte';

import Reel from './Reel.svelte';

const meta = {
  title: 'Components/Reel',
  component: Reel,
  tags: ['autodocs'],
} satisfies Meta<Reel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    symbols: ['🍑', '🍉', '🍇']
  },
};

export const Spinning: Story = {
    args: {
      symbols: ['🍑', '🍉', '🍇'],
      isSpinning: true,
    },
};

