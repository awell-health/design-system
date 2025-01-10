import { type FC, useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import classnames from 'classnames'
import {
  DayPicker,
  getDefaultClassNames,
  type DateRange,
  type DateInterval,
} from 'react-day-picker'
import { format, parseISO } from 'date-fns'

import { Button } from '../button';
import { Input } from '../form/input';
import { Icon } from '../icon';

interface Props {
  onSelect: (from: string, to: string) => void
  initialStartDateOffset?: number
  defaultFromDate?: string
  defaultToDate?: string
}

const DateRangeSelect: FC<Props> = (props) => {
  const {
    onSelect, 
    defaultFromDate, 
    defaultToDate, 
    initialStartDateOffset = 7
  } = props;


  const initialToDate = new Date()
  const initialFromDate = new Date()
  initialFromDate.setDate(initialFromDate.getDate() - initialStartDateOffset)

  const [selected, setSelected] = useState<DateRange>({
    from: typeof defaultFromDate !== 'undefined' ? parseISO(defaultFromDate) : initialFromDate,
    to: typeof defaultToDate !== 'undefined' ? parseISO(defaultToDate) : initialToDate,
  })

  const [isOpen, setIsOpen] = useState(false)
  const defaultClassNames = getDefaultClassNames()

  const ref = useRef(null)

  useClickAway(ref, () => {
    setIsOpen(false)
  })

  useEffect(() => {
    if (!isOpen && selected?.from && selected?.to) {
      onSelect(
        format(selected.from, 'yyyy-MM-dd'),
        format(selected.to, 'yyyy-MM-dd'),
      )
    }
  }, [selected, isOpen])

  const intervalMatcher: DateInterval = {
    before: new Date(2024, 0, 1),
    after: new Date(),
  }

  const inputDateFormat = 'd LLL, yyyy'
  const getInputValue = (): string => {
    return selected?.from && selected?.to
      ? `${format(selected.from, inputDateFormat)} - ${format(
          selected.to,
          inputDateFormat,
        )}`
      : ''
  }

  const getDateFromPast = (days: number | null): Date => {
    if (typeof days !== 'number') {
      return new Date()
    }

    const initialFromDate = new Date()
    initialFromDate.setDate(initialFromDate.getDate() - days)
    return initialFromDate
  }

  const definedDates = [
    {
      label: '7 days',
      value: 7,
    },
    {
      label: '30 days',
      value: 30,
    },
    {
      label: '3 months',
      value: 90,
    },
    {
      label: '6 months',
      value: 180,
    },
    {
      label: 'This year',
      value: null,
    },
  ]

  const handlePreselectedDate = (days: number | null) => {
    setSelected({ from: getDateFromPast(days), to: initialToDate })
    setIsOpen(false)
  }

  return (
    <div className='relative w-56' ref={ref}>
      <div
        className={classnames(
          'absolute top-10 left-0 z-10 bg-white w-[46rem]',
          'shadow-lg p-4 border border-slate-200 rounded-lg',
          'transition-opacity ease-in-out delay-150 duration-300',
          {
            'opacity-100 block': isOpen,
            'opacity-0 hidden': !isOpen,
          },
        )}
      >
        <div className='flex justify-between'>
          <DayPicker
            disabled={intervalMatcher}
            selected={selected}
            onSelect={setSelected}
            captionLayout='label'
            min={0}
            mode='range'
            numberOfMonths={2}
            pagedNavigation
            required
            classNames={{
              ...defaultClassNames,
              root: `${defaultClassNames.root}`, // Add a shadow to the root element
              chevron: `fill-blue-500`,
              day_button: `w-6 h-6 hover:text-blue-500 hover:font-semibold`,
              day: `p-2`,
              today: `${defaultClassNames.today} text-blue-500`,
              selected: `bg-blue-500 border-blue-500 text-white`,
              range_end: `bg-blue-500 rounded-r-[50%]`,
              range_middle: `bg-blue-400`,
              range_start: `bg-blue-500 rounded-l-[50%]`,
            }}
          />
          <div className='flex flex-col gap-2 pt-4'>
            <span className='text-sm text-slate-500'>Last</span>
            {definedDates.map(date => (
              <Button
                key={date.value}
                variant='secondary'
                size='sm'
                className='text-xs'
                onClick={() => handlePreselectedDate(date.value)}
              >
                {date.label}
              </Button>
            ))}
            <Button
              variant='primary'
              size='sm'
              className='text-xs'
              onClick={() => setIsOpen(false)}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
      <Input
        type='text'
        prefixIcon={<Icon icon='RiCalendarLine' />}
        readOnly
        className='cursor-pointer'
        onClick={() => setIsOpen(true)}
        value={getInputValue()}
      />
    </div>
  )
};

export { DateRangeSelect };
