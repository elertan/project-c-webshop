import * as React from 'react';
import AppLayout from '../../layout/AppLayout/AppLayout';
import {  withStyles } from '@material-ui/core';

import styles, { StyleProps } from "./TrackStyle";
import TrackList from '../../reusable/TrackList/TrackList';

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ITrackData } from '../../reusable/TrackRow/TrackRow';

interface IProps extends StyleProps {
 
}

class Track extends React.Component<IProps> {

  public render() {
    const query = gql`
    {
        tracks {
          name
          durationMs
          albums{
           name
          }
          artists{
            name
          }
        }
      }
    
    `;

    return (
      <AppLayout>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return <span>{error.message}</span>;
            }

            return this.renderDetail(data.tracks);
          }}
        </Query>
      </AppLayout>
    );
  }

  private renderDetail = (tracks: any[]) => {
    const classes = this.props.classes!
    const data: ITrackData[] = tracks.map((track: any, i: number) =>
      ({ title: track.name, durationMs: track.durationMs, artistName: track.artists[0].name,albumsName: track.albums[0].name, index: i } as ITrackData)
    );
// albumsName werkt niet
    return (
      <div className={classes.page}>
      <div className= {classes.title}>
        <TrackList trackData={data} />
      </div>
      </div>
    );
  };
}

export default withStyles(styles)(Track);
