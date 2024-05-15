// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { AlertDialog } from "@/components/ui/alert-dialog";

const meta = {
  component: AlertDialog,
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof AlertDialog>;

function AlertDialogDemo() {
  return (
    <AlertDialog
      title="Modal title"
      text="Some text to display when modal is open"
      button={{
        label: "Redirect",
        buttonAction: () => console.log('button click')
      }}
    > 
      </AlertDialog>
  );
}

export const Example = {
  args: {},
  render: () => <AlertDialogDemo />,
} satisfies Story;
