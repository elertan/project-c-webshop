import * as React from 'react';
import * as moment from 'moment';

import { Icon } from '@material-ui/core';
export interface ITrackData {
  title: string[];
  durationMs: number;
  index?: number;
  albumsName: string[];
  artistName: string[];
}

interface IProps {
  data: ITrackData;
  
}

const TrackRow: React.SFC<IProps> = (props: IProps) => {
  
  const { title, durationMs, albumsName, artistName} = props.data;
  const time = moment().startOf('day')
    .milliseconds(durationMs);
    
    const trackTime = time.hours() >= 1 ?(
      time.format('HH:mm:ss')
    ) : (
      time.format('mm:ss')
    )
  
  return(
// hoe geef ik hieronder styling 
    <tr>
     
      <Icon>favorite</Icon>
      <td>{title}</td>
      <td>{artistName}</td>
      <td>{albumsName}</td>
      <td>{trackTime}</td>
      <Icon  fontSize = "large"   >play_circle_outline</Icon>
      
      
    </tr>
    
  );
};

export default TrackRow;
