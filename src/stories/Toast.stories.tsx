// Replace your-framework with the name of your framework
import { Icon } from "@/components/ui/icon";
import { Toast } from "@/components/ui/toast";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;


  

function ToastDemo() {
  const handleClose = () => { console.log('closed!') }
  const title = "“Patient Intake” has just been deleted."
  const description = "Check out the all new dashboard view. Pages and exports now load faster."

  return (
    <>
      <h3 className="py-4 text-lg">Botton One: Default</h3>
      <h3 className="py-4 text-lg">Middle: Vertical middle variant with description</h3>
      <div>
        <Toast title={title} handleClose={handleClose} vertical='middle'/>
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} text={description}/>
      </div>
    </>
  );
}

function ToastDemoTwo() {
  const handleClose = () => { console.log('closed!') }
  const title = "“Patient Intake” has just been deleted."
  const titleTwo = "Title with a very long and convoluted name to show how the test wraps around"
  const icon = <Icon icon="RiDeleteBinFill" className="fill-red-600"/>
  const description = "Check out the all new dashboard view. Pages and exports now load faster. Adding this at the end to show the wrapping"

  return (
    <>
      <h3 className="py-4 text-lg">Variants with icons </h3>
      <div>
        <Toast title={titleTwo} handleClose={handleClose} icon={icon} vertical='top'/>
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} vertical='middle'/>
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} text={description} />
      </div>
      
    </>
  );
}

function ToastDemoThree() {
  const handleClose = () => { console.log('closed!') }
  const title = "“Patient Intake” has just been deleted."
  const icon = <Icon icon="RiDeleteBinFill" className="fill-slate-600"/>

  return (
    <>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} horizontal='start'/>
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} horizontal='end' />
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} />
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} horizontal='start' vertical='middle'/>
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} horizontal='end' vertical='middle' />
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} vertical='middle' />
      </div>

      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} horizontal='start' vertical='top'/>
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} horizontal='end' vertical='top' />
      </div>
      <div>
        <Toast title={title} handleClose={handleClose} icon={icon} vertical='top' />
      </div>
    </>
  );
}

export const Example = {
  args: {},
  render: () => <ToastDemo />,
} satisfies Story;

export const ExampleTwo = {
  args: {},
  render: () => <ToastDemoTwo />,
} satisfies Story;

export const ExampleThree = {
  args: {},
  render: () => <ToastDemoThree />,
} satisfies Story;

