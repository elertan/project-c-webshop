import * as React from 'react';
import TrackRow, {ITrackData} from '../TrackRow/TrackRow';
import styles, {StyleProps} from "../../home/albums/TrackStyle";
import {withStyles} from '@material-ui/core';

interface IProps extends StyleProps {
  trackData: ITrackData[];
}

class TrackList extends React.Component<IProps> {

  public render() {
    const classes = this.props.classes!;
    return (
      <table>
        <tr>
          <td className={classes.actions}/>
          <td className={classes.title}>Title</td>
          <td className={classes.artist}>Artist</td>
          <td className={classes.album}>Album</td>
          <td className={classes.duration}>Duration</td>
        </tr>
        {this.props.trackData.map((trackData, i) =>
          <TrackRow key={i} data={trackData}/>
        )}
      </table>
    );
  }
}

export default withStyles(styles)(TrackList);
