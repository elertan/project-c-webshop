import * as React from "react";
import Column = AdazzleReactDataGrid.Column;
import {Header, Button, Icon} from "semantic-ui-react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import * as ReactDataGrid from 'react-data-grid';
import {withApollo, WithApolloClient} from "react-apollo";
import {userState} from "../../../../../../index";
import gql from "graphql-tag";
import GridRowsUpdatedEvent = AdazzleReactDataGrid.GridRowsUpdatedEvent;
import IUser from "src/models/IUser";
import {NavLink} from "react-router-dom";
import { Editors } from "react-data-grid-addons";
const { DropDownEditor } = Editors;

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

const options = [
  { id: "true", value: true as any, title: "True", text: "True" },
  { id: "false", value: false as any, title: "False", text: "False" },
];

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
        <Icon name="trash"/>
      </Button>
    )
  },
  {key: "id", name: "Id"},
  {key: "name", name: "Name", editable: true},
  {key: "durationMs", name: "Duration (ms)", editable: true},
  {key: "explicit", name: "Explicit", editable: true, formatter: ({ value }) => <span>{value ? "True" : "False"}</span>, editor: <DropDownEditor options={options} /> },
  {key: "previewUrl", name: "Preview URL", editable: true},
];

const GET_TRACKS_QUERY = gql`
{
    tracks(first: 999999, orderBy: {path: "id"}) {
        items {
            id
            name
            durationMs
            previewUrl
            explicit
        }
    }
}
`;

const UPDATE_TRACK_MUTATION = gql`
mutation q($data: UpdateTrackDataInput!) {
  updateTrackData(data: $data) {
    data {
      id
      name
      durationMs
      explicit
      previewUrl
    }
  }
}
`;

const DELETE_TRACK_MUTATION = gql`
mutation q($data: DeleteTrackDataInput!) {
  deleteTrack(data: $data) {
    errors {
      message
    }
  }
}
`;

interface IProps {
}

interface IState {
  tracks: any[] | null;
}

class Tracks extends React.Component<IProps & WithApolloClient<{}>, IState> {
  public state = {
    tracks: null
  };

  public async componentDidMount() {
    const result = await this.props.client.query<any>({
      query: GET_TRACKS_QUERY,
    });
    this.setState({tracks: result.data.tracks.items});
  }

  public render() {
    console.log(this.state);
    console.log("Rendering...")
    return (
      <div>
        <AdminMenu/>
        <div style={styles.centerItems}>
          <Header as="h2">
            <div style={styles.centerItems}>All tracks</div>
            <Header.Subheader>
              In this tab you can create, read, update and delete information
              regarding all available tracks
            </Header.Subheader>
          </Header>
        </div>
        <div style={{
          margin: 20
        }}>
          {this.state.tracks === null ?
            <p>Loading...</p>
            :
            <ReactDataGrid
              columns={columns(this.handleDelete)}
              rowGetter={i => this.state.tracks![i]}
              rowsCount={(this.state.tracks! as any[]).length}
              onGridRowsUpdated={this.handleGridRowsUpdated}
              enableCellSelect
            />
          }
        </div>
        <div style={styles.centerItems}>
          <Button.Group basic size="massive">
            <NavLink to={"tracks/addtrack"}>
              <Button size="massive">
                <Icon name="add"/>
                Add track
              </Button>
            </NavLink>
          </Button.Group>
        </div>
      </div>
    );
  }

  private handleGridRowsUpdated = async (e: GridRowsUpdatedEvent<any>) => {
    const user = userState.state.user! as IUser;

    const trackId = (this.state.tracks![e.fromRow] as any).id;
    if (e.updated.explicit) {
      e.updated.explicit = e.updated.explicit !== "false";
    }
    try {
      const result = await this.props.client.mutate<any>({
        mutation: UPDATE_TRACK_MUTATION,
        variables: {
          data: {
            authToken: user.token,
            ...e.updated,
            trackId
          }
        }
      });

      const newTracks = [...(this.state.tracks! as any[])];
      newTracks[e.fromRow] = result.data!.updateTrackData.data;

      this.setState({tracks: newTracks});
    } catch {
      alert("There was an error trying to mutate the track.\nThis has occurred due to an invalid requested mutation.");
    }
  };

  private handleDelete = async (id: number) => {
    const user = userState.state.user! as IUser;

    await this.props.client.mutate<any>({
      mutation: DELETE_TRACK_MUTATION,
      variables: {
        data: {
          authToken: user.token,
          trackId: id
        }
      }
    });

    const newTracks = (this.state.tracks! as any[]).filter(x => x.id !== id);
    this.setState({tracks: newTracks});
  };
}

export default withApollo(Tracks);
