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
    const { container } = render(
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

    expect(container).toMatchSnapshot();
  });

  it('supports an opt-in scrollable body', () => {
    const { container } = render(
      <Table bodyMaxHeight={240}>
        <TableHeader>
          <TableRow>
            <TableHead>Carflow name</TableHead>
            <TableHead>Version</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10).keys()].map((i) => (
            <TableRow key={i}>
              <TableCell>Care Flow Name-{i}</TableCell>
              <TableCell>Example Cell</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='py-0'>Table Caption</TableCaption>
      </Table>
    );

    const wrapper = container.querySelector('div');
    const table = container.querySelector('table');

    expect(wrapper?.className).toContain('overflow-hidden');
    expect(table?.getAttribute('style')).toContain('--table-body-max-height: 240px');
    expect(table?.className).toContain('[&_tbody]:overflow-y-auto');
    expect(table?.className).toContain('[&_tbody]:max-h-[var(--table-body-max-height)]');
  });
});
