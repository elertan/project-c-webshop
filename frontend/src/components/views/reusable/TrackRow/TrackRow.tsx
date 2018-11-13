import * as React from 'react';
import * as moment from 'moment';
import {Link} from 'react-router-dom';
import { Icon } from '@material-ui/core';

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

const TrackRow: React.SFC<IProps> = (props: IProps) => {
  
  const { title, durationMs, albumsName, artistName, albumId, previewUrl} = props.data;
  const time = moment().startOf('day')
    .milliseconds(durationMs);
    
    const trackTime = time.hours() >= 1 ?(
      time.format('HH:mm:ss')
    ) : (
      time.format('mm:ss')
    )
  
  if (previewUrl != null) {
    return (
      <tr>
        <Icon>favorite</Icon>
        <td>{title}</td>
        <td>{artistName}</td>
        <Link to={`/album/${albumId}`}>
          <td>{albumsName}</td>
        </Link> 
        <td>{trackTime}</td>
        <a href={previewUrl} target="_blank">
          <Icon fontSize = "large">play_circle_outline</Icon>
        </a>
      </tr>
    );
  } else {
      return (
        <tr>
          <Icon>favorite</Icon>
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
