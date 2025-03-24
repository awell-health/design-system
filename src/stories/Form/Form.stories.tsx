import { Input } from '@/components/ui/form/input';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, FormSection, Select } from '../../components';
import { FormButtons } from '../../components/ui/form/form-buttons/FormButtons';
import FormContent from '../../components/ui/form/form-content/FormContent';

const meta = {} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Example = {
  args: {},
  render: () => (
    <form>
      <FormContent>
        <FormSection
          title='Section Title for single input'
          hint='Use Form section to group form fields or to separate form fields into different sections'
          isRequired
        >
          <Input placeholder='Input Placeholder' />
        </FormSection>
        <FormSection title='Section Title for multiple inputs'>
          <Input label='Input Label' placeholder='Input Placeholder' required />
          <Select
            label='Select Label'
            placeholder='Select Placeholder'
            options={[]}
            handleChange={() => {}}
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
