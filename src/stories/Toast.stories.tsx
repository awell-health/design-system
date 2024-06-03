// Replace your-framework with the name of your framework
import { Icon } from "@/components/ui/icon";
import { Toast } from "@/components/ui/toast";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toast> = {
  component: Toast,
  argTypes: {
    horizontal: {
      options: ["center", "start", "end"],
      controls: {
        type: "select",
      }
    },
    vertical: {
      options: ["bottom", "top", "middle"],
      controls: {
        type: "select",
      }
    },
    title: { control: 'text'},
    text: { control: 'text'},
    icon: {
      options: [null, <Icon icon="RiDeleteBinFill" className="fill-red-600"/>],
    } 
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

const handleClose = () => {
  console.log("close")
}

export const Example: Story = {
  render: (args) => {
    const { horizontal, vertical, title, text, icon } = args;
    return (
      <>
        <h3 className="p-4"></h3>
        <div  className="p-4">
          <Toast horizontal={horizontal} vertical={vertical} title={title} text={text} icon={icon} handleClose={handleClose}/>
        </div>
      </>
    )
  }, 
  args: {
    horizontal: "center",
    vertical: "bottom",
    title: "“Patient Intake” has just been deleted.",
    text: "Check out the all new dashboard view. Pages and exports now load faster.",
    icon: <Icon icon="RiDeleteBinFill" className="fill-red-600"/>
  },
};
