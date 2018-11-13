import * as React from 'react';
import * as moment from 'moment';
import {Link} from 'react-router-dom';
import {Button, Icon} from "semantic-ui-react";

export interface ITrackData {
  title: string[];
  durationMs: number;
  index?: number;
  albumsName: string[];
  artistName: string[];
  albumId: number;
  previewUrl: string;
}

interface IProps {
  data: ITrackData;
}

const styles = {
  actionsTd: {

  }
};

const TrackRow: React.SFC<IProps> = (props: IProps) => {
  
  const { title, durationMs, albumsName, artistName, albumId, previewUrl} = props.data;
  const time = moment().startOf('day')
    .milliseconds(durationMs);
    
    const trackTime = time.hours() >= 1 ?(
      time.format('HH:mm:ss')
    ) : (
      time.format('mm:ss')
    );
  
  if (previewUrl != null) {
    return (
      <tr>
        <td style={styles.actionsTd}>
          <Button.Group>
            <Button icon><Icon name="play" color="black" /></Button>
            <Button icon><Icon name="heart" color="red" /></Button>
            <Button icon><Icon name="shopping basket" color="black" /></Button>
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
  } else {
      return (
        <tr>
          <td>{title}</td>
          <td>{artistName}</td>
          <Link to={`/album/${albumId}`}>
            <td>{albumsName}</td>
          </Link> 
          <td>{trackTime}</td>
        </tr>
      )
    }
};

export default TrackRow;
