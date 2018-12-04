import * as React from 'react';

interface IProps {
  day: number | null;
  onChange: (day: number) => void;
  daysInMonth: number;
}

const defaultValue = String(null);

const DaySelect: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <select
      value={String(props.day)}
      onChange={ev => props.onChange(Number(ev.target.value))}
    >
      <option value={defaultValue} disabled>Day</option>
      {Array.from({ length: props.daysInMonth }).map((_, i) => i + 1).map(i => (
        <option key={i} value={i}>{i}</option>
      ))}
    </select>
  );
};

export default DaySelect;
