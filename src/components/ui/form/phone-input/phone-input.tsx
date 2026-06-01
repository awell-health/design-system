import * as React from 'react';
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
  type CountryData,
  type CountryIso2,
  type ParsedCountry
} from 'react-international-phone';

import { cn } from '@/lib/utils';
import { Label } from '../label/label';
import { CountrySelector } from './country-selector';

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value'> {
  value?: string;
  onChange?: (phone: string, meta: { country: ParsedCountry; inputValue: string }) => void;
  defaultCountry?: CountryIso2;
  showFlags?: boolean;
  availableCountries?: string[];
  preferredCountries?: CountryIso2[];
  label?: string;
  sublabel?: string;
  helpText?: string;
  hasError?: boolean;
  className?: string;
  labelClassName?: string;
}

const orderCountries = (countries: CountryData[], preferredCountries: CountryIso2[] = []) => {
  if (preferredCountries.length === 0) {
    return countries;
  }

  const preferredCountrySet = new Set(preferredCountries.map((country) => country.toLowerCase()));
  const preferred = countries.filter((country) =>
    preferredCountrySet.has(parseCountry(country).iso2.toLowerCase())
  );
  const remaining = countries.filter(
    (country) => !preferredCountrySet.has(parseCountry(country).iso2.toLowerCase())
  );

  return [...preferred, ...remaining];
};

const getAvailableCountries = (availableCountries?: string[]) => {
  if (!availableCountries || availableCountries.length === 0) {
    return defaultCountries;
  }

  const availableCountrySet = new Set(availableCountries.map((country) => country.toLowerCase()));

  return defaultCountries.filter((country) =>
    availableCountrySet.has(parseCountry(country).iso2.toLowerCase())
  );
};

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      label,
      helpText,
      hasError,
      onChange,
      value,
      defaultCountry = 'us',
      showFlags = false,
      availableCountries,
      preferredCountries = [],
      labelClassName,
      required,
      sublabel,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const filteredCountries = React.useMemo(
      () => getAvailableCountries(availableCountries),
      [availableCountries]
    );
    const countries = React.useMemo(
      () => orderCountries(filteredCountries, preferredCountries),
      [filteredCountries, preferredCountries]
    );

    const defaultCountryIsAvailable = countries.some(
      (country) => parseCountry(country).iso2 === defaultCountry
    );
    const effectiveDefaultCountry = defaultCountryIsAvailable
      ? defaultCountry
      : parseCountry(countries[0] ?? defaultCountries[0]).iso2;

    const touchedRef = React.useRef(false);

    const {
      inputValue,
      handlePhoneValueChange,
      inputRef: phoneInputRef,
      country,
      setCountry
    } = usePhoneInput({
      defaultCountry: effectiveDefaultCountry,
      value,
      countries,
      preferredCountries,
      disableDialCodePrefill: true,
      inputRef,
      onChange: (data) => {
        if (!touchedRef.current) return;
        onChange?.(data.phone, {
          country: data.country,
          inputValue: data.inputValue
        });
      }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      touchedRef.current = true;
      handlePhoneValueChange(e);
    };

    const handleCountrySelect = (countryIso2: CountryIso2) => {
      touchedRef.current = true;
      setCountry(countryIso2, { focusOnInput: true });
    };

    React.useImperativeHandle(ref, () => phoneInputRef.current as HTMLInputElement);

    return (
      <div className=''>
        {label && (
          <Label label={label} sublabel={sublabel} className={labelClassName} required={required} />
        )}
        <label className='form-control w-full flex relative'>
          {showFlags && (
            <CountrySelector
              countries={countries}
              selectedCountry={country.iso2}
              onSelect={handleCountrySelect}
              disabled={disabled}
            />
          )}
          <input
            type='tel'
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              'px-3.5 py-2.5',
              'h-[38px] min-h-[38px] rounded-lg gap-2 w-full border-box',
              'text-sm font-normal',
              'shadow border border-slate-300 text-black placeholder:text-slate-400',
              'focus:outline-0 focus:border focus:border-blue-500',
              'disabled:bg-slate-50 disabled:text-slate-400',
              showFlags && 'pl-16',
              hasError && 'border-red-500 focus:border-red-500',
              className
            )}
            onChange={handleChange}
            ref={phoneInputRef}
            required={required}
            {...props}
          />
        </label>
        {helpText && (
          <div className='label'>
            <span
              className={cn(
                'label-text-alt text-slate-500 text-xs font-normal',
                hasError && 'text-red-600'
              )}
            >
              {helpText}
            </span>
          </div>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
