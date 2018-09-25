import * as React from 'react';

import HomeLayout from "../../layout/HomeLayout/HomeLayout";
import AlbumGrid from "../../reusable/AlbumGrid/AlbumGrid";
import IAlbumGridData from "../../reusable/AlbumGrid/IAlbumGridData";
import gql from "graphql-tag";
import { Query } from "react-apollo";

interface IProps {
}

const query = gql`
  {
    tracks{
      name
      albums{
        imageUrl
      }
    }
  }
`;

const Explore: React.SFC<IProps> = (props: IProps) => {
  return (
    <HomeLayout>
      <div >
        <Query query={query}>
          {(data) => {
            if (data.loading) { return null; }
            if (data.error) { return <p>{data.error.message}</p>; }

            const albumGridData = (data.data.tracks as any[]).map(track=> ({
              name: track.name,
              imageSource: track.albums[0].imageUrl,
              onClick: () => alert(track.name)
            }) as IAlbumGridData);

            return <AlbumGrid data={albumGridData} />
          }}
        </Query>
          
      </div>
    </HomeLayout>
  );
};

export default Explore;
