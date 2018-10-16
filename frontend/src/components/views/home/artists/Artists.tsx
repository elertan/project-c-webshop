import * as React from 'react';
<<<<<<< HEAD
import './Artists.css';
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

            const artistGridData = (data.data.artists as any[]).map(artist => ({
              name: artist.name,
              imageSource: artist.imageUrl,
              id: artist.id
            }) as IArtistsGridData);

            return <ArtistsGrid data={artistGridData} />
          }}
        </Query>

      </div>
    </AppLayout>
  );
};
=======
import AppLayout from "../../layout/AppLayout/AppLayout";
import {Typography} from "@material-ui/core";

interface IProps {}

class Artists extends React.Component<IProps> {
    public render() {
        return (
            <AppLayout>
                <Typography>
                    Here all known artists will be shown.
                </Typography>
            </AppLayout>
        );
    }
}
>>>>>>> dev

export default Artists;
