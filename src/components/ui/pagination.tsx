import { Icon } from "./icon";
import { Button } from "./button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  totalCount: number;
  onPageChange: (page: number) => void;
  perPage?: number;
  maxButtonsToShow?: number;
}

function Pagination(props: PaginationProps) {
  const { totalCount, onPageChange, perPage = 10, maxButtonsToShow = 5 } = props;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const numberOfPages = Math.ceil(totalCount / perPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page + 1);
  };

  const nextButtonDisabled = currentPage === numberOfPages - 1;
  const prevButtonDisabled = currentPage === 0;
  const showDivider = maxButtonsToShow < numberOfPages;

  const renderItems = () => {
    const buttonsToShow = showDivider ? maxButtonsToShow : numberOfPages;
    const dividerPosition = Math.ceil(buttonsToShow / 2) - 1;
    let items = [...Array(numberOfPages).keys()];

    if (showDivider) {
      const firstItems = Math.round(maxButtonsToShow / 2)
      const lastItems = maxButtonsToShow - firstItems

      items = [
        ...items.slice(0, firstItems),
        ...items.slice(Math.max(items.length - lastItems, 0))
      ]
    }

    return items.map((i) => (
      <>
        <Button
          key={i}
          variant={currentPage === i ? "secondaryBlue" : "ghost"}
          onClick={() => handleClick(i)}
        >
          {i + 1}
        </Button>
        {showDivider && i === dividerPosition && (
          <span key='divider' className="flex h-8 mt-1">...</span>
        )}
      </>
    ));
  };

  return (
    <div
      className={
        "w-full px-6 py-4 bg-white justify-between items-start inline-flex"
      }
    >
      {numberOfPages > 1 && (
        <>
          <div className="w-32">
            <Button
              variant="secondary"
              onClick={() => handleClick(currentPage - 1)}
              disabled={prevButtonDisabled}
            >
              <Icon
                icon="RiArrowLeftLine"
                size={16}
                className={cn(prevButtonDisabled && "fill-slate-200")}
              />{" "}
              Previous
            </Button>
          </div>
          <div className="flex grow gap-2 justify-center">{renderItems()}</div>
          <div className="w-32">
            <Button
              className={cn(nextButtonDisabled && "fill-slate-200")}
              disabled={nextButtonDisabled}
              variant="secondary"
              onClick={() => handleClick(currentPage + 1)}
            >
              Next <Icon icon="RiArrowRightLine" size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export { Pagination };
