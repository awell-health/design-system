import { Input } from '@/components/ui/form/input';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, FormSection, Select, Textarea, FormButtons, FormContent } from '../../components';

const meta = {} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Example = {
  args: {},
  render: () => (
    <form>
      <FormContent>
        <FormSection title='Section Form title' hint='This is a text which is a hint' showSeparator>
          <Input
            label='Input Label'
            placeholder='Input Placeholder'
            required
            sublabel='Input Sublabel'
          />
          <Input
            label='Input Label'
            placeholder='Input Placeholder'
            required
            sublabel='Input Sublabel'
          />
          <Select
            label='Select Label'
            sublabel='Select Sublabel'
            placeholder='Select Placeholder'
            options={[]}
            handleChange={() => {}}
          />
          <Textarea
            label='Textarea Label'
            placeholder='Textarea Placeholder'
            required
            sublabel='Textarea Sublabel'
          />
        </FormSection>
      </FormContent>

      <FormButtons
        remove={<Button variant='error'>Delete</Button>}
        cancel={<Button variant='secondary'>Cancel</Button>}
        save={<Button variant='primary'>Save</Button>}
      />
    </form>
  )
} satisfies Story;
