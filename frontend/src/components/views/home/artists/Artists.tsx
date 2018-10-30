import * as React from 'react';
import './Artists.css';
import AppLayout from "../../layout/AppLayout/AppLayout";
import ArtistGrid from "../../reusable/ArtistsGrid/ArtistsGrid";
import GridView from "../../reusable/GridView/GridView";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ArtistPicture from "../../../../img/artist.jpg";

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
            const artists = (data.data.artists.items as any[]).map((name, i) =>
              <ArtistGrid key={i} name={name.name} imageSource={ArtistPicture} id={name.id}/>
            );

            return <GridView elements={artists}/>;
          }}
        </Query>

      </div>
    </AppLayout>
  );
};

export default Artists;
