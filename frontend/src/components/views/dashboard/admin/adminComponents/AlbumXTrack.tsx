import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {withApollo, WithApolloClient} from "react-apollo";
import gql from "graphql-tag";
import Column = AdazzleReactDataGrid.Column;
import {Button, Header, Icon} from "semantic-ui-react";
import AdminMenu from "../../../reusable/Admin/AdminMenu";
import GridRowsUpdatedEvent = AdazzleReactDataGrid.GridRowsUpdatedEvent;
import * as ReactDataGrid from 'react-data-grid';
import {userState} from "../../../../../index";
import IUser from "../../../../../models/IUser";

interface IProps {}

const GET_ALBUM_X_TRACKS_QUERY = gql`
{
  albumXTracks(first: 99999) {
    items {
      albumId
      trackId
    }
  }
}
`;

const UPDATE_ALBUM_X_TRACKS_MUTATION = gql`
mutation q($data: UpdateAlbumXTrackDataInput!) {
  updateAlbumXTrackData(data: $data) {
    data {
      albumId
      trackId
    }
    errors {
      message
    }
  }
}
`;

const styles = {
  menuPadding: {
    padding: "2vw"
  },
  centerItems: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center"
  }
};

const columns: (deleteRow: (id: number) => void) => Array<Column<any>> = (deleteRow) => [
  {
    key: "$actions",
    name: "Actions",
    getRowMetaData: row => row,
    formatter: props => (
      <Button
        icon
        onClick={() => deleteRow(props.dependentValues.id)}
        circular
      >
        <Icon name="trash" />
      </Button>
    )
  },
  { key: "id", name: "Id" },
  { key: "albumId", name: "Album Id", editable: true },
  { key: "trackId", name: "Track Id", editable: true }
];

const AlbumXTrack: React.FunctionComponent<IProps & WithApolloClient<{}>> = (props) => {
  const [albumXTracks, setAlbumXTracks] = useState<any[] | null>(null);
  useEffect((async () => {
    const result = await props.client.query<any>({
      query: GET_ALBUM_X_TRACKS_QUERY
    });

    setAlbumXTracks(result.data.albumXTracks.items);
  }) as any, []);

  const handleDelete = useRef((id: number) => {
    console.log('Handle deletion of ' + id);
  });

  const handleGridRowsUpdated = useRef(async (e: GridRowsUpdatedEvent<any>) => {
    const user = userState.state.user! as IUser;

    const albumXTrackId = albumXTracks![e.fromRow].id;
    const result = await props.client.mutate<any>({
      mutation: UPDATE_ALBUM_X_TRACKS_MUTATION,
      variables: {
        data: {
          authToken: user.token,
          albumXTrackId,
          ...e.updated,
        }
      }
    });

    const newData = [...albumXTracks!];
    newData[e.fromRow] = result.data!.updateUserData.data;

    setAlbumXTracks(newData);
  });

  return (
    <div>
      <AdminMenu />

      <div style={styles.centerItems}>
        <Header as="h2">
          <div style={styles.centerItems}>Album X Track</div>
          <Header.Subheader>
            In this tab you can create, read, update and delete information
            regarding the the tracks that are children of the albums
          </Header.Subheader>
        </Header>
      </div>

      <div style={{
        margin: 20
      }}>
        {albumXTracks === null ?
          <p>Loading...</p>
          :
          <ReactDataGrid
            columns={columns(handleDelete.current)}
            rowGetter={i => albumXTracks![i]}
            rowsCount={albumXTracks!.length}
            onGridRowsUpdated={handleGridRowsUpdated.current}
            enableCellSelect
          />
        }
      </div>

    </div>
  );
};

export default withApollo(AlbumXTrack);
