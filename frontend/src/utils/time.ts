import * as moment from 'moment';

export const getTrackTimeFromDurationMs = (durationMs: number) => {
  const time = moment().startOf('day')
    .milliseconds(durationMs);

  const trackTime = time.hours() >= 1 ? (
    time.format('HH:mm:ss')
  ) : (
    time.format('mm:ss')
  );

  return trackTime;
};
