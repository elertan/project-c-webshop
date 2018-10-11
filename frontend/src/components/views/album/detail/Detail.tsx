import * as React from 'react';
import {Typography, withStyles} from '@material-ui/core';
import Separator from '../../reusable/Separator';
import styles, {StyleProps} from "./DetailStyle";
import TrackList from '../../reusable/TrackList/TrackList';

import gql from "graphql-tag";
import {Query} from "react-apollo";
import {ITrackData} from '../../reusable/TrackRow/TrackRow';
import AppLayout from "../../layout/AppLayout/AppLayout";

interface IProps extends StyleProps {
  albumId: number;
}

class Detail extends React.Component<IProps> {

  public render() {
    const query = gql`
    {
      album(id: ${this.props.albumId}) {
        name
        imageUrl
        tracks {
          name
          durationMs
        }
      }
    }
    `;

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

            return this.renderDetail(data.album);
          }}
        </Query>
      </AppLayout>
    );
  }

  private renderDetail = (album: any) => {
    const classes = this.props.classes!;
    const data: ITrackData[] = album.tracks.map((track: any) =>
      ({title: track.name, durationMs: track.durationMs} as ITrackData)
    );

    return (
      <div>
        <div
          className={classes.albumContainerBackground}
          style={{backgroundImage: `url(${album.imageUrl})`}}
        />
        <div className={classes.albumInnerContainerDarkenLayer}/>
        <div
          className={classes.albumContainer}
        >
          <div className={classes.albumInnerContainer}>
            <img
              className={classes.image}
              src={album.imageUrl}
            />
            <Typography className={classes.title}>{album.name}</Typography>
            <Typography className={classes.artistsText}>ArtistName,ArtistName</Typography>
          </div>
        </div>
        <Separator horizontal/>
        <TrackList trackData={data}/>
      </div>
    );
  };
}

export default withStyles(styles)(Detail);
