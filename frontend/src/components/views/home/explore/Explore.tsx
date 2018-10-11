import * as React from 'react';
import './Explore.css';
import AppLayout from "../../layout/AppLayout/AppLayout";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
import GridView from "../../reusable/GridView/GridView";

interface IProps {
}

const query = gql`
  {
    albums {
      id
      name
      imageUrl
    }
  }
`;

const Explore: React.SFC<IProps> = (props: IProps) => {
  return (
    <AppLayout>
      <div className="Explore-root">
        <Query query={query}>
          {(data) => {
            if (data.loading) { return null; }
            if (data.error) { return <p>{data.error.message}</p>; }

            const covers = (data.data.albums as any[]).map((album, i) =>
              <AlbumCover key={i} name={album.name} imageSource={album.imageUrl} id={album.id}/>
            );

            return <GridView elements={covers} />;
          }}
        </Query>

      </div>
    </AppLayout>
  );
};

export default Explore;
