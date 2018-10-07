import * as React from 'react';
import TrackRow, { ITrackData } from '../TrackRow/TrackRow';

interface IProps {
  trackData: ITrackData[];
}

class TrackList extends React.Component<IProps> {
  public render() {
    return (
      <div>
        {this.props.trackData.map((trackData, i) =>
          <TrackRow
            key={i}
            data={trackData}
          />
        )}
      </div>
    );
  }
}

export default TrackList;
