import * as React from 'react';
import * as moment from 'moment';

export interface ITrackData {
  title: string;
  durationMs: number;
}

interface IProps {
  data: ITrackData;
}

const TrackRow: React.SFC<IProps> = (props: IProps) => {
  const { title, durationMs } = props.data;
  const time = moment().startOf('day')
    .milliseconds(durationMs);

  return time.hours() >= 1 ? ( 
    <div>
      {title}&nbsp;
      -&nbsp;
      {time.format('HH:mm:ss')}
    </div>
  ) : (
    <div>
      {title}&nbsp;
      -&nbsp;
      {time.format('mm:ss')}
    </div>
  );
};

export default TrackRow;
