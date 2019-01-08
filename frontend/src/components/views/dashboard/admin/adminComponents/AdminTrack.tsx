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

const GET_TRACKS_QUERY = gql`
{
  tracks(first: 99999) {
    items {
     id
    }
  }
}
`;

const UPDATE_TRACKS_MUTATION = gql`
mutation q($data: UpdateTrackDataInput!) {
  updateTrackData(data: $data) {
    data {
      id
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
  { key: "id", name: "id" },
];

const AdminTrack: React.FunctionComponent<IProps & WithApolloClient<{}>> = (props) => {
  const [Tracks, setTracks] = useState<any[] | null>(null);
  useEffect((async () => {
    const result = await props.client.query<any>({
      query: GET_TRACKS_QUERY
    });

    setTracks(result.data.Tracks.items);
  }) as any, []);

  const handleDelete = useRef((id: number) => {
    console.log('Handle deletion of ' + id);
  });

  const handleGridRowsUpdated = useRef(async (e: GridRowsUpdatedEvent<any>) => {
    const user = userState.state.user! as IUser;

    const TrackId = Tracks![e.fromRow].id;
    const result = await props.client.mutate<any>({
      mutation: UPDATE_TRACKS_MUTATION,
      variables: {
        data: {
          authToken: user.token,
          TrackId,
          ...e.updated,
        }
      }
    });

    const newData = [...Tracks!];
    newData[e.fromRow] = result.data!.updateUserData.data;

    setTracks(newData);
  });

  return (
    <div>
      <AdminMenu />

      <div style={styles.centerItems}>
        <Header as="h2">
          <div style={styles.centerItems}>Album X Track</div>
          <Header.Subheader>
            In this tab you can create, read, update and delete information
            regarding the the tracks 
          </Header.Subheader>
        </Header>
      </div>

      <div style={{
        margin: 20
      }}>
        {Tracks === null ?
          <p>Loading...</p>
          :
          <ReactDataGrid
            columns={columns(handleDelete.current)}
            rowGetter={i => Tracks![i]}
            rowsCount={Tracks!.length}
            onGridRowsUpdated={handleGridRowsUpdated.current}
            enableCellSelect
          />
        }
      </div>

    </div>
  );
};

export default withApollo(AdminTrack);
