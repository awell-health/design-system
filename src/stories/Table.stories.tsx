import type { Meta, StoryObj } from "@storybook/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, Dropdown, DropdownItem, Icon, Pagination } from "..";

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

function TableDemo() {
  const totalCount = 12;
  const onClick = () => {
    console.log("click");
  };

  const items: DropdownItem[] = [
    { label: "Test 1", onClick },
    {
      label: (
        <>
          <Icon icon="RiAccountPinBoxFill" />
          JSX item
        </>
      ),
      onClick,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead info={<span>Info</span>}>Carflow name</TableHead>
          <TableHead info={<span>Info</span>} sort='asc'>Created</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10).keys()].map((i) => (
          <TableRow key={i}>
            <TableCell>Care Flow Name-{i}</TableCell>
            <TableCell className="flex flex-col items-start">
              25/06/2024 04:32 PM
              <span>by virginia@turtlecare.com</span>
            </TableCell>
            <TableCell>
              <Badge variant={"success"}>Label</Badge>
            </TableCell>
            <TableCell>
              <Dropdown
                buttonLabel={<Icon icon="RiMore2Line" size={16} />}
                items={items}
                buttonClassNames="bg-white border-none shadow-none btn-xs btn-square"
                placement='left'
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption className="py-0">
        <Pagination totalCount={totalCount} onPageChange={(n) => console.log(n)}/>
      </TableCaption>
    </Table>
  );
}

export const Example = {
  args: {},
  render: () => <TableDemo />,
} satisfies Story;
