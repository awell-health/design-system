import { Fragment, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { Icon } from '../icon';

interface PaginationProps {
  totalCount: number;
  onPageChange: (page: number) => void;
  perPage?: number;
}

function Pagination(props: PaginationProps) {
  const { totalCount, onPageChange, perPage = 10 } = props;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const edgeButtonsToShow = 3;
  const numberOfPages = Math.ceil(totalCount / perPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page + 1);
  };

  const nextButtonDisabled = currentPage === numberOfPages - 1;
  const prevButtonDisabled = currentPage === 0;
  const showDivider = edgeButtonsToShow * 2 < numberOfPages;

  const renderItems = () => {
    let items: Array<number | string> = [...Array(numberOfPages).keys()];

    if (showDivider) {
      const displayCurrentPage =
        currentPage >= edgeButtonsToShow && currentPage < numberOfPages - edgeButtonsToShow;

      const displayPrefixDivider = currentPage > edgeButtonsToShow + 1;

      const displayPrevPage =
        (displayCurrentPage && currentPage > edgeButtonsToShow) ||
        currentPage === items.length - edgeButtonsToShow;

      const displayNextPage =
        (displayCurrentPage && currentPage < items.length - edgeButtonsToShow - 1) ||
        currentPage === edgeButtonsToShow - 1;

      const displaySuffixDivider = currentPage < items.length - edgeButtonsToShow - 2;

      items = [
        ...items.slice(0, edgeButtonsToShow),
        ...(displayPrefixDivider ? ['prefix-divider'] : []),
        ...(displayPrevPage ? [currentPage - 1] : []),
        ...(displayCurrentPage ? [currentPage] : []),
        ...(displayNextPage ? [currentPage + 1] : []),
        ...(displaySuffixDivider ? ['suffix-divider'] : []),
        ...items.slice(Math.max(items.length - edgeButtonsToShow, 0))
      ];
    }

    return items.map((i) => (
      <Fragment key={i}>
        {typeof i === 'string' && i === 'prefix-divider' && (
          <span key={i} className='flex h-8 mt-1'>
            ...
          </span>
        )}
        {typeof i === 'number' && (
          <Button
            key={i}
            variant={currentPage === i ? 'secondaryBlue' : 'ghost'}
            onClick={(e) => {
              e.preventDefault();
              handleClick(i);
            }}
          >
            {i + 1}
          </Button>
        )}
        {typeof i === 'string' && i === 'suffix-divider' && (
          <span key={i} className='flex h-8 mt-1'>
            ...
          </span>
        )}
      </Fragment>
    ));
  };

  return (
    <div className={'w-full px-6 py-4 bg-white justify-between items-start inline-flex'}>
      {numberOfPages > 1 && (
        <>
          <Button
            variant='secondary'
            onClick={(e) => {
              e.preventDefault();
              handleClick(currentPage - 1);
            }}
            disabled={prevButtonDisabled}
          >
            <Icon
              icon='RiArrowLeftLine'
              size={16}
              className={cn(prevButtonDisabled && 'fill-slate-200')}
            />{' '}
            Previous
          </Button>
          <div className='flex grow gap-2 justify-center'>{renderItems()}</div>
          <Button
            className=''
            disabled={nextButtonDisabled}
            variant='secondary'
            onClick={(e) => {
              e.preventDefault();
              handleClick(currentPage + 1);
            }}
          >
            Next{' '}
            <Icon
              icon='RiArrowRightLine'
              size={16}
              className={cn(nextButtonDisabled && 'fill-slate-200')}
            />
          </Button>
        </>
      )}
    </div>
  );
}

export { Pagination };
