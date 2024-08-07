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
