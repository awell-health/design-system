// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { AlertDialog } from "@/components/ui/alert-dialog";

const meta = {
  component: AlertDialog,
  args: {
    variant: "success",
    title: "Modal title",
    text: "Some text to display when modal is open",
    button: undefined,
    children: <div className="py-4">SOME CHILD CONTENT</div>,
    onClose: undefined,
    secondaryButton: undefined,
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof AlertDialog>;
// type AlertDialogProps = Parameters<typeof AlertDialog>[0]
function AlertDialogDemo(args: any) {
  return <AlertDialog {...args} />;
}
export const Example = {
  args: {
    secondaryButton: {
      label: "Cancel",
      buttonAction: () => alert("secondary click"),
    },
    button: {
      label: "Redirect",
      buttonAction: () => alert("button click"),
    },
    onClose: () => alert("closed"),
  },
  render: (args) => <AlertDialogDemo {...args} />,
} satisfies Story;
