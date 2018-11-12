import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
import {Grid} from "semantic-ui-react";

interface IProps {
}

const query = gql` 
  {
      albums (first: 100, orderBy: {path: "name"}) {
          items {
              id
              name
              images(orderBy: {
                  path: "height",
                  descending: true    
              }, first: 1) {
                  items {
                      url
                  }
              }
          }
      }
  }
  `;

const Albums: React.SFC<IProps> = (props: IProps) => {
  return (
    <AppLayout>
      <div className="Explore-root">
        <Query query={query}>
          {(data) => {
            if (data.loading) {
              return null;
            }
            if (data.error) {
              return <p>{data.error.message}</p>;
            }

            return (
              <Grid columns={5} doubling>
                {(data.data.albums.items as any[]).map((album, i) =>
                  <Grid.Column key={i}>
                    <AlbumCover name={album.name} imageSource={album.images.items.length > 0 && album.images.items[0].url} id={album.id}/>
                  </Grid.Column>
                )}
              </Grid>
            );
          }}
        </Query>

      </div>
    </AppLayout>
  );
};

export default Albums;
