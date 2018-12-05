import * as React from 'react';
import * as moment from "moment";
import YearSelect from "./YearSelect";
import {Input} from "semantic-ui-react";
import DaySelect from "./DaySelect";
import MonthSelect from "./MonthSelect";

interface IProps {
  date: moment.Moment;
  onChange: (date: moment.Moment) => void;
}

const BirthdatePicker: React.FunctionComponent<IProps> = (props: IProps) => {
  const day = props.date.date(); // Date is the day in the current month
  const year = props.date.year();
  const month = props.date.month();
  const daysInMonth = props.date.daysInMonth();

  return (
    <div className="fields">
      <div className="field">
        <label>Month</label>
        <Input
          id="birthmonth"
          placeholder="month"
          size="large"
        >
          <MonthSelect
            month={month}
            onChange={value => {
              const newDate = props.date.set('month', value);
              // MomentJS automatically handles day in month overflow
              props.onChange(newDate);
            }}
          />
        </Input>
      </div>
      <div className="field">
        <label>Day</label>
        <Input
          id="birthday"
          placeholder="day"
          size="large"
        >
          <DaySelect
            day={day}
            onChange={value => {
              const newDate = props.date.set('date', value);
              props.onChange(newDate);
            }}
            daysInMonth={daysInMonth}
          />
        </Input>
      </div>
      <div className="field">
        <label>Year</label>
        <Input
          id="birthyear"
          placeholder="year"
          size="large"
        >
          <YearSelect
            year={year}
            onChange={value => {
              const newDate = props.date.set('year', value);
              props.onChange(newDate);
            }}
          />
        </Input>
      </div>
    </div>
  );
};

export default BirthdatePicker;
