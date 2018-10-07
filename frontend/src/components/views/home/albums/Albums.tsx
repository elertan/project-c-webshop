import * as React from 'react';

import AppLayout from "../../layout/AppLayout/AppLayout";
import AlbumGrid from "../../reusable/AlbumGrid/AlbumGrid";
import IAlbumGridData from "../../reusable/AlbumGrid/IAlbumGridData";
import gql from "graphql-tag";
import { Query } from "react-apollo";

interface IProps {
}

const query = gql`
  {
    tracks {
      name
      albums {
        id
        imageUrl
      }
    }
  }
`;

const Explore: React.SFC<IProps> = (props: IProps) => {
  return (
    <AppLayout>
      <div >
        <Query query={query}>
          {(data) => {
            if (data.loading) { return null; }
            if (data.error) { return <p>{data.error.message}</p>; }

            const albumGridData = (data.data.tracks as any[]).map(track=> ({
              name: track.name,
              imageSource: track.albums[0].imageUrl,
              id: track.albums[0].id
            }) as IAlbumGridData);

            return <AlbumGrid data={albumGridData} />
          }}
        </Query>
          
      </div>
    </AppLayout>
  );
};

export default Explore;
