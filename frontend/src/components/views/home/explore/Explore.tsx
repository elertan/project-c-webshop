import * as React from 'react';
import './Explore.css';
import HomeLayout from "../../layout/HomeLayout/HomeLayout";
import AlbumGrid from "../../reusable/AlbumGrid/AlbumGrid";
import IAlbumGridData from "../../reusable/AlbumGrid/IAlbumGridData";
import gql from "graphql-tag";
import { Query } from "react-apollo";

interface IProps {
}

const query = gql`
  {
    albums {
      name
      imageUrl
    }
  }
`;

const Explore: React.SFC<IProps> = (props: IProps) => {
  return (
    <HomeLayout>
      <div className="Explore-root">
        <Query query={query}>
          {(data) => {
            if (data.loading) { return null; }
            if (data.error) { return <p>{data.error.message}</p>; }

            const albumGridData = (data.data.albums as any[]).map(album => ({
              name: album.name,
              imageSource: album.imageUrl
            }) as IAlbumGridData);

            return <AlbumGrid data={albumGridData} />
          }}
        </Query>

      </div>
    </HomeLayout>
  );
};

export default Explore;
