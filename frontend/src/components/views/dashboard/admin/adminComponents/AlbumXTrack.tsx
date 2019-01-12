import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {withApollo, WithApolloClient} from "react-apollo";
import gql from "graphql-tag";
import Column = AdazzleReactDataGrid.Column;
import {Button, Header, Icon} from "semantic-ui-react";
import AdminMenu from "../../../reusable/Admin/AdminMenu";
import * as ReactDataGrid from 'react-data-grid';
import {userState} from "../../../../../index";
import IUser from "../../../../../models/IUser";
import {NavLink} from "react-router-dom";

interface IProps {}

const GET_ALBUM_X_TRACKS_QUERY = gql`
{
  albumXTracks(first: 99999, orderBy: { path: "albumId" }) {
    items {
      albumId
      trackId
    }
  }
}
`;

const DELETE_ABLUM_X_TRACK_MUTATION = gql`
mutation x($data: DeleteAlbumXTrackDataInput!) {
  deleteAlbumXTrack(data: $data) {
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

const columns: (deleteRow: (id1: number, id2: number) => void) => Array<Column<any>> = (deleteRow) => [
  {
    key: "$actions",
    name: "Actions",
    getRowMetaData: row => row,
    formatter: props => (
      <Button
        icon
        onClick={() => deleteRow(props.dependentValues.albumId, props.dependentValues.trackId)}
        circular
      >
        <Icon name="trash" />
      </Button>
    )
  },
  { key: "albumId", name: "Album Id" },
  { key: "trackId", name: "Track Id" }
];

const AlbumXTrack: React.FunctionComponent<IProps & WithApolloClient<{}>> = (props) => {
  const [albumXTracks, setAlbumXTracks] = useState<any[] | null>(null);
  useEffect((async () => {
    const result = await props.client.query<any>({
      query: GET_ALBUM_X_TRACKS_QUERY
    });

    setAlbumXTracks(result.data.albumXTracks.items);
  }) as any, []);

  const handleDelete = useCallback(async (albumId: number, trackId: number) => {
    const user = userState.state.user! as IUser;

    try {
      const result = await props.client.mutate<any>({
        mutation: DELETE_ABLUM_X_TRACK_MUTATION,
        variables: {
          data: {
            authToken: user.token,
            albumId,
            trackId
          }
        }
      });
      if (result.data!.deleteAlbumXTrack.errors) {
        const errorMsgs = result.data!.deleteAlbumXTrack.errors.map((err: any) => err.message) as string[];
        errorMsgs.forEach(alert);
        return;
      }
      setAlbumXTracks(albumXTracks!.filter(x => x.albumId !== albumId && x.trackId !== trackId));
    } catch (err) {
      console.log(err);
      alert("Failed to delete entry");
    }
  }, [albumXTracks]);

  return (
    <div>
      <AdminMenu />

      <div style={styles.centerItems}>
        <Header as="h2">
          <div style={styles.centerItems}>Album X Track</div>
          <Header.Subheader>
            In this tab you can view, delete and add new relationships between the album and track entities
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
            columns={columns(handleDelete)}
            rowGetter={i => albumXTracks![i]}
            rowsCount={albumXTracks!.length}
            enableCellSelect
          />
        }
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
        <Button basic size="massive">
          <NavLink to={"albumxtrack/add"}>
            <Button size="massive">
              <Icon name="add" />
              Add new
            </Button>
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default withApollo(AlbumXTrack);
