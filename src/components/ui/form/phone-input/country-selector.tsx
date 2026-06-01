import * as React from 'react';
import {
  FlagImage,
  parseCountry,
  type CountryData,
  type CountryIso2
} from 'react-international-phone';

import { cn } from '@/lib/utils';

interface CountrySelectorProps {
  countries: CountryData[];
  selectedCountry: CountryIso2;
  onSelect: (country: CountryIso2) => void;
  disabled?: boolean;
}

export function CountrySelector({
  countries,
  selectedCountry,
  onSelect,
  disabled = false
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const parsedCountries = React.useMemo(() => countries.map(parseCountry), [countries]);
  const selectedParsedCountry = parsedCountries.find((country) => country.iso2 === selectedCountry);

  const filteredCountries = React.useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return parsedCountries;
    }

    return parsedCountries.filter((country) => {
      return (
        country.name.toLowerCase().includes(normalizedSearch) ||
        country.iso2.toLowerCase().includes(normalizedSearch) ||
        country.dialCode.includes(normalizedSearch.replace('+', ''))
      );
    });
  }, [parsedCountries, searchValue]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      setFocusedIndex(0);
      window.setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setSearchValue('');
    }
  }, [isOpen]);

  React.useEffect(() => {
    setFocusedIndex(0);
  }, [searchValue]);

  const handleSelect = (country: CountryIso2) => {
    onSelect(country);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (!isOpen) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex((index) => Math.min(index + 1, filteredCountries.length - 1));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex((index) => Math.max(index - 1, 0));
    }

    if (event.key === 'Enter' && filteredCountries[focusedIndex]) {
      event.preventDefault();
      handleSelect(filteredCountries[focusedIndex].iso2);
    }
  };

  return (
    <div ref={rootRef} className='absolute left-0 top-0 z-20 h-[38px]' onKeyDown={handleKeyDown}>
      <button
        type='button'
        aria-label='Select country'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        disabled={disabled}
        className={cn(
          'h-[38px] min-h-[38px] w-14 rounded-l-lg border-r border-slate-300',
          'flex items-center justify-center gap-1 bg-transparent',
          'focus:outline-0 focus:ring-2 focus:ring-blue-500 focus:ring-inset',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
        onClick={() => setIsOpen((open) => !open)}
      >
        <FlagImage iso2={selectedParsedCountry?.iso2} size='20px' />
        <span className='text-slate-500 text-[10px]' aria-hidden='true'>
          &#9662;
        </span>
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute left-0 top-[38px] z-50 w-[360px] rounded-lg border border-slate-200 bg-white shadow-lg',
            'text-sm font-normal text-slate-700'
          )}
        >
          <div className='border-b border-slate-200 p-2'>
            <input
              ref={searchInputRef}
              type='search'
              value={searchValue}
              placeholder='Search countries...'
              aria-label='Search countries'
              className={cn(
                'h-9 w-full rounded-md border border-slate-300 px-3 text-sm',
                'focus:outline-0 focus:border-blue-500'
              )}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>

          <ul role='listbox' className='max-h-[300px] overflow-y-auto py-1'>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <li
                  key={country.iso2}
                  role='option'
                  aria-selected={country.iso2 === selectedCountry}
                >
                  <button
                    type='button'
                    className={cn(
                      'flex w-full items-center px-3 py-2 text-left',
                      'hover:bg-slate-100 focus:outline-0 focus:bg-slate-100',
                      country.iso2 === selectedCountry && 'bg-slate-200 text-slate-700',
                      index === focusedIndex && 'bg-slate-100'
                    )}
                    onMouseEnter={() => setFocusedIndex(index)}
                    onClick={() => handleSelect(country.iso2)}
                  >
                    <FlagImage iso2={country.iso2} size='20px' className='mr-2 shrink-0' />
                    <span className='mr-2 truncate'>{country.name}</span>
                    <span className='ml-auto text-slate-500'>+{country.dialCode}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className='px-3 py-2 text-slate-500'>No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
