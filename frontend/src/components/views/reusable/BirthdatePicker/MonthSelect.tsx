import * as React from 'react';

interface IProps {
  month: number | null;
  onChange: (month: number) => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const defaultValue = String(null);

const MonthSelect: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <select
      value={String(props.month)}
      onChange={ev => props.onChange(Number(ev.target.value))}
    >
      <option value={defaultValue} disabled>Month</option>
      {months.map((month, i) => (
        <option key={i} value={i}>{month}</option>
      ))}
    </select>
  );
};

export default MonthSelect;
