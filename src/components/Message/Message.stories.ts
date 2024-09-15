import type { Meta, StoryObj } from '@storybook/svelte';

import Message from './Message.svelte';

const meta = {
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
} satisfies Meta<Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'You Win! x2'
  },
};