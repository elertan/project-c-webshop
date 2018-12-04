import * as React from 'react';

interface IProps {
  year: number | null;
  onChange: (year: number) => void;
}

const defaultValue = String(null);
const minYear = 1900;
const maxYear = new Date().getFullYear();

// Build up keys in reverse from the max year
// [2017, 2016, 2015...]
// We subtract the current year by one in order to reduce the complexity of validation
// (e.g. current date 4 December 2018, user picks 20 December 2018. Would not be valid, it's safe
// to assume that the user would be at least 1 year old
const yearKeys = Array.from({ length: maxYear - minYear }).map((_, i) => maxYear - i - 1);

const YearSelect: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <select
      value={String(props.year)}
      onChange={ev => props.onChange(Number(ev.target.value))}
    >
      <option value={defaultValue} disabled>Year</option>
      {yearKeys.map(year => (
        <option key={year} value={String(year)}>{year}</option>
      ))}
    </select>
  );
};

export default YearSelect;
