import * as React from 'react';
import './Artists.css';
import AppLayout from "../../layout/AppLayout/AppLayout";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import ArtistCover from "../../reusable/ArtistCover/ArtistCover";
import {Grid} from "semantic-ui-react";

interface IProps {
}

const query = gql`
  {
    artists(first: 999) {
      items {
        id
        name
        imageUrl
      }
    }
  }
`;

const Artists: React.SFC<IProps> = (props: IProps) => {
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
                {(data.data.artists.items as any[]).map((name, i) =>
                  <Grid.Column key={i}>
                    <ArtistCover name={name.name} imageSource={name.imageUrl} id={name.id}/>
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

export default Artists;
