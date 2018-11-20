import * as React from 'react';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
import {Grid} from "semantic-ui-react";
import AppLayout from "../../layout/AppLayout/AppLayout";

interface IProps {
}

const query = gql`
  {
    albums(first: 50) {
      items {
        id
        name
        images(orderBy: {
          path: "height"
        }) {
          items {
            url
          }
        }
      }
    }
  }
`;

const Explore: React.SFC<IProps> = (props: IProps) => {
  return (
    <AppLayout>
      <Query query={query}>
        {(data) => {
          if (data.loading) {
            return null;
          }
          if (data.error) {
            return <p>{data.error.message}</p>;
          }

          const albums = data.data.albums.items as any[];

          return (
            <Grid
              columns={5}
              doubling
            >
              {albums.map((album, i) =>
                <Grid.Column key={i}>
                  <AlbumCover key={i} name={album.name} imageSource={album.images.items} id={album.id}/>
                </Grid.Column>
              )}
            </Grid>
          );
        }}
      </Query>
    </AppLayout>
  );
};

export default Explore;
