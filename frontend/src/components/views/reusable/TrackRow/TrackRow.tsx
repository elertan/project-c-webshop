import * as React from 'react';
import {Link} from 'react-router-dom';
import {Button, Icon} from "semantic-ui-react";
import {Subscribe} from "unstated";
import MusicPlayerState from "../../../../states/MusicPlayerState";
import {getTrackTimeFromDurationMs} from "../../../../utils/time";

export interface ITrackData {
  title: string;
  durationMs: number;
  index?: number;
  albumsName: string;
  artistName: string;
  albumId: number;
  previewUrl: string | null;
}

interface IProps {
  data: ITrackData;
}

const styles = {
  actionsTd: {}
};

class TrackRow extends React.Component<IProps> {

  public render() {
    const {title, durationMs, albumsName, artistName, albumId, previewUrl} = this.props.data;

    const trackTime = getTrackTimeFromDurationMs(durationMs);

    return (
      <tr>
        <td style={styles.actionsTd}>
          <Button.Group>
            <Subscribe to={[MusicPlayerState]}>
              {(musicPlayerState: MusicPlayerState) => (
                <Button
                  icon
                  disabled={previewUrl === null}
                  onClick={this.handlePreviewClick(musicPlayerState)}
                >
                  <Icon name="play" color="black"/>
                </Button>
              )}
            </Subscribe>
            <Button icon><Icon name="heart" color="red"/></Button>
            <Button icon><Icon name="shopping basket" color="black"/></Button>
          </Button.Group>
        </td>
        <td>{title}</td>
        <td>{artistName}</td>
        <Link to={`/album/${albumId}`}>
          <td>{albumsName}</td>
        </Link>
        <td>{trackTime}</td>
      </tr>
    );
  }

  private handlePreviewClick = (musicPlayerState: MusicPlayerState) => () => {
    musicPlayerState.startNew(this.props.data.previewUrl!, this.props.data.title, 30000);
  };
}

export default TrackRow;
