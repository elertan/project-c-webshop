import * as React from 'react';
import AppLayout from '../../layout/AppLayout/AppLayout';
import { Typography, withStyles } from '@material-ui/core';
import Separator from '../../reusable/Separator';
import styles, { StyleProps } from "./DetailStyle";

import gql from "graphql-tag";
import { Query } from "react-apollo";

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

            return this.renderDetail(data.album);
          }}
        </Query>
      </AppLayout>
    );
  }

  private renderDetail = (album: any) => {
    const classes = this.props.classes!;

    return (
      <div>
        <div
          className={classes.albumContainerBackground}
          style={{ background: `url(${album.imageUrl})` }}
        />
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
        <Separator horizontal />
      </div>
    );
  };
}

export default withStyles(styles)(Detail);
