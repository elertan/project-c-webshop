import * as React from 'react';
import TrackRow from '../TrackRow/TrackRow';
import styles, {StyleProps} from "../../home/albums/TrackStyle";
import {withStyles} from '@material-ui/core';
import ITrack from "../../../../models/ITrack";

interface IProps extends StyleProps {
  trackData: ITrack[];
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
          <TrackRow key={i} data={trackData} noFavoriteAndCart={this.props.trackData.length === 1} />
        )}
      </table>
    );
  }
}

export default withStyles(styles)(TrackList);
