import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import {
  Table,
  TableHeader,
  TableCaption,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from './index';

describe('Table', () => {
  it('match snapshot', () => {
    const result = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead info={<span>Info</span>}>Carflow name</TableHead>
            <TableHead sortable={true}>Version</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10).keys()].map((i) => (
            <TableRow key={i}>
              <TableCell>Care Flow Name-{i}</TableCell>
              <TableCell supportingText='by example@awellhealth.com'>Example Cell</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='py-0'>Table Caption</TableCaption>
      </Table>
    );

    expect(result).toMatchSnapshot();
  });
});
