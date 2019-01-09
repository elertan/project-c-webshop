import * as React from "react";
import Column = AdazzleReactDataGrid.Column;
import { Header, Button, Icon } from "semantic-ui-react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import * as ReactDataGrid from 'react-data-grid';
import { withApollo, WithApolloClient } from "react-apollo";
import { userState } from "../../../../../../index";
import gql from "graphql-tag";
import GridRowsUpdatedEvent = AdazzleReactDataGrid.GridRowsUpdatedEvent;
import IUser from "src/models/IUser";

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
    { key: "name", name: "Name", editable: true },
];

const GET_ARTISTS_QUERY = gql`
{
    artists(first: 999999, orderBy: {path: "id"}) {
        items {
            id
            name
        }
    }
}
`;

const UPDATE_ARTIST_MUTATION = gql`
mutation q($data: UpdateArtistDataInput!) {
  updateArtistData(data: $data) {
    data {
      id
      name
      
    }
  }
}
`;

const DELETE_ARTIST_MUTATION = gql`
mutation q($data: DeleteArtistDataInput!) {
  deleteArtist(data: $data) {
    errors {
      message
    }
  }
}
`;

interface IProps {}
interface IState {
    artists: any[] | null;
}

class Artists extends React.Component<IProps & WithApolloClient<{}>, IState> {
    public state = {
        artists: null
    };

    public async componentDidMount() {
        // const user = userState.state.user! as IUser;
        const result = await this.props.client.query<any>({
            query: GET_ARTISTS_QUERY,
        });
        this.setState({ artists: result.data.artists.items });
    }

    public render() {
        console.log(this.state);
        console.log("Rendering...")
        return (
            <div>
                <AdminMenu />
                <div style={styles.centerItems}>
                    <Header as="h2">
                        <div style={styles.centerItems}>All Artists</div>
                        <Header.Subheader>
                            In this tab you can create, read, update and delete information
                            regarding all available Artists
            </Header.Subheader>
                    </Header>
                </div>
                <div style={{
                    margin: 20
                }}>
                    {this.state.artists === null ?
                        <p>Loading...</p>
                        :
                        <ReactDataGrid
                            columns={columns(this.handleDelete)}
                            rowGetter={i => this.state.artists![i]}
                            rowsCount={(this.state.artists! as any[]).length}
                            onGridRowsUpdated={this.handleGridRowsUpdated}
                            enableCellSelect
                        />
                    }
                </div>
                
            </div>
        );
    }

    private handleGridRowsUpdated = async (e: GridRowsUpdatedEvent<any>) => {
        const user = userState.state.user! as IUser;

        const artistId = (this.state.artists![e.fromRow] as any).id;
        try {
            const result = await this.props.client.mutate<any>({
                mutation: UPDATE_ARTIST_MUTATION,
                variables: {
                    data: {
                        authToken: user.token,
                        ...e.updated,
                        artistId
                    }
                }
            });

            const newArtists = [...(this.state.artists! as any[])];
            newArtists[e.fromRow] = result.data!.updateArtistData.data;

            this.setState({ artists: newArtists });
        } catch {
            alert("There was an error trying to mutate the Artist.\nThis has occurred due to an invalid requested mutation."); 
        }
    };

    private handleDelete = async (id: number) => {
        const user = userState.state.user! as IUser;

        await this.props.client.mutate<any>({
            mutation: DELETE_ARTIST_MUTATION,
            variables: {
                data: {
                    authToken: user.token,
                    artistId: id
                }
            }
        });

        const newArtists = (this.state.artists! as any[]).filter(x => x.id !== id);
        this.setState({ artists: newArtists });
    };
}

export default withApollo(Artists);
