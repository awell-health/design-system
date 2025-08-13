import type { Meta, StoryObj } from '@storybook/react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge, Dropdown, DropdownItem, Icon, Pagination } from '..';

const meta = {
  component: Table
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

const totalCount = 12;
const onClick = () => {
  console.log('click');
};

const items: DropdownItem[] = [
  { label: 'Test 1', onClick },
  {
    label: (
      <>
        <Icon icon='RiAccountPinBoxFill' />
        JSX item
      </>
    ),
    onClick
  }
];

export const Example = {
  args: {},
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead info={<span>Info</span>}>Carflow name</TableHead>
          <TableHead info={<span>Info</span>} sortable={true} order='desc'>
            Created
          </TableHead>
          <TableHead sortable={true}>Version</TableHead>
          <TableHead>&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10).keys()].map((i) => (
          <TableRow key={i}>
            <TableCell>Care Flow Name-{i}</TableCell>
            <TableCell supportingText='by virginia@turtlecare.com'>25/06/2024 04:32 PM</TableCell>
            <TableCell>
              <Badge variant={'success'}>Label</Badge>
            </TableCell>
            <TableCell>
              <Dropdown
                buttonLabel={<Icon icon='RiMore2Line' size={16} />}
                items={items}
                buttonClassNames='bg-white border-none shadow-none btn-xs btn-square'
                placement='left'
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption className='py-0'>
        <Pagination totalCount={totalCount} onPageChange={(n) => console.log(n)} />
      </TableCaption>
    </Table>
  )
} satisfies Story;

export const LongTextWrapping = {
  args: {},
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Care flow name</TableHead>
          <TableHead>Activity title</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            Universal_Prevent_RiskReduction_MVP — a very descriptive name that should wrap to the
            next line when it exceeds the available width
          </TableCell>
          <TableCell supportingText='by nordic@turtlecare.com'>
            Healthy Habits for Life - data capture with a subtitle that is intentionally quite long
            so we can verify wrapping works as expected
          </TableCell>
          <TableCell>
            This is a long sentence with normal spacing that should wrap naturally without causing
            any horizontal overflow of the table container.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
} satisfies Story;

export const UnbrokenStringWrapping = {
  args: {},
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Column A</TableHead>
          <TableHead>Column B</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            superlongunbreakabletoken_superlongunbreakabletoken_superlongunbreakabletoken_superlongunbreakabletoken
          </TableCell>
          <TableCell>
            https://averylongexampledomain.com/path/with/very/long/segments/that/should/wrap/even/without/spaces
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
} satisfies Story;

export const NarrowContainer = {
  args: {},
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Care flow name</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Version</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3).keys()].map((i) => (
            <TableRow key={i}>
              <TableCell>
                Very long value that needs to wrap gracefully without introducing a horizontal
                scrollbar in a narrow container
              </TableCell>
              <TableCell supportingText='by virginia@turtlecare.com'>25/06/2024 04:32 PM</TableCell>
              <TableCell>
                <Badge variant={'success'}>Label</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} satisfies Story;
