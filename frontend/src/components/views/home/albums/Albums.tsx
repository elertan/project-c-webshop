import * as React from 'react';
import {withStyles} from '@material-ui/core';

import styles, {StyleProps} from "./TrackStyle";
import TrackList from '../../reusable/TrackList/TrackList';

import gql from "graphql-tag";
import {Query} from "react-apollo";
import {ITrackData} from '../../reusable/TrackRow/TrackRow';
import AppLayout from "../../layout/AppLayout/AppLayout";

interface IProps extends StyleProps {

}

const query = gql`
    {
        tracks {
          items {
            name
            durationMs
            previewUrl
            albums {
              items {
                name
                id
              }
            }
            artists {
              items {
                name
              }
            }
          }
        }
      }
    `;

class Track extends React.Component<IProps> {

  public render() {

    return (
      <AppLayout>
        <Query query={query}>
          {({loading, error, data}) => {
            if (loading) {
              return null;
            }
            if (error) {
              return <span>{error.message}</span>;
            }

            return this.renderDetail(data.tracks.items);
          }}
        </Query>
      </AppLayout>
    );
  }

  private renderDetail = (tracks: any[]) => {
    const classes = this.props.classes!;
    const data: ITrackData[] = tracks.map((track: any, i: number) =>
      ({
        title: track.name,
        previewUrl: track.previewUrl,
        albumId: track.albums.items[0].id,
        durationMs: track.durationMs,
        artistName: track.artists.items[0].name,
        albumsName: track.albums.items[0].name,
        index: i
      } as ITrackData)
    );
    return (
      <div className={classes.page}>
        <div className={classes.title}>
          <TrackList trackData={data}/>
        </div>
      </div>
    );
  };
}

export default withStyles(styles)(Track);
