import * as React from 'react';
import './Artists.css';
import './simplegrid.css';
import AppLayout from "../../layout/AppLayout/AppLayout";
import ArtistsGrid from "../../reusable/ArtistsGrid/ArtistsGrid";
import IArtistsGridData from "../../reusable/ArtistsGrid/IArtistGridData";
import gql from "graphql-tag";
import { Query } from "react-apollo";

interface IProps {
}

const query = gql`
  {
    artists {
      id
      name
      imageUrl
    }
  }
`;

const Artists: React.SFC<IProps> = (props: IProps) => {
  return (
    <AppLayout>
      <div className="Explore-root">
        <Query query={query}>
          {(data) => {
            if (data.loading) { return null; }
            if (data.error) { return <p>{data.error.message}</p>; }

            const artistGridData = (data.data.artists as any[]).map(artists => ({
              name: artists.name,
              imageSource: artists.imageUrl,
              id: artists.id
            }) as IArtistsGridData);

            return <ArtistsGrid data={artistGridData} />
          }}
        </Query>

      </div>
    </AppLayout>
  );
};

export default Artists;
