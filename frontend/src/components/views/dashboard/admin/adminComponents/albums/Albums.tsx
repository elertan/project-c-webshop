import * as React from "react";
import Column = AdazzleReactDataGrid.Column;
import { Header, Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
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
    { key: "label", name: "Label", editable: true },
    { key: "popularity", name: "Popularity", editable: true },
    { key: "albumType", name: "AlbumType", editable: true },
];

const GET_ALBUMS_QUERY = gql`
{
    albums(first: 999999) {
        items {
            id
            name
            label
            popularity
            albumType
        }
    }
}
`;

const UPDATE_ALBUM_MUTATION = gql`
mutation q($data: UpdateAlbumDataInput!) {
  updateAlbumData(data: $data) {
    data {
      id
      name
      label
      popularity
      albumType
    }
  }
}
`;

const DELETE_ALBUM_MUTATION = gql`
mutation q($data: DeleteAlbumDataInput!) {
  deleteAlbum(data: $data) {
    errors {
      message
    }
  }
}
`;

interface IProps {}
interface IState {
    albums: any[] | null;
}

class Albums extends React.Component<IProps & WithApolloClient<{}>, IState> {
    public state = {
        albums: null
    };

    public async componentDidMount() {
        // const user = userState.state.user! as IUser;
        const result = await this.props.client.query<any>({
            query: GET_ALBUMS_QUERY,
        });
        this.setState({ albums: result.data.albums.items });
    }

    public render() {
        console.log(this.state);
        console.log("Rendering...")
        return (
            <div>
                <AdminMenu />
                <div style={styles.centerItems}>
                    <Header as="h2">
                        <div style={styles.centerItems}>All albums</div>
                        <Header.Subheader>
                            In this tab you can create, read, update and delete information
                            regarding all available albums
            </Header.Subheader>
                    </Header>
                </div>
                <div style={{
                    margin: 20
                }}>
                    {this.state.albums === null ?
                        <p>Loading...</p>
                        :
                        <ReactDataGrid
                            columns={columns(this.handleDelete)}
                            rowGetter={i => this.state.albums![i]}
                            rowsCount={(this.state.albums! as any[]).length}
                            onGridRowsUpdated={this.handleGridRowsUpdated}
                            enableCellSelect
                        />
                    }
                </div>
                <div style={styles.centerItems}>
                    <Button.Group basic size="massive">
                        <NavLink to={"users/all"}>
                            <Button animated="fade" size="massive">
                                <Button.Content visible>
                                    <Icon name="search" />
                                    Find album
                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="search" />
                                    Find album
                </Button.Content>
                            </Button>
                        </NavLink>

                        <Button.Or />

                        <NavLink to={"albums/addalbum"}>
                            <Button animated="fade" size="massive">
                                <Button.Content visible>
                                    <Icon name="add" />
                                    Add album
                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="add" />
                                    Add album
                </Button.Content>
                            </Button>
                        </NavLink>
                    </Button.Group>
                </div>
            </div>
        );
    }

    private handleGridRowsUpdated = async (e: GridRowsUpdatedEvent<any>) => {
        const user = userState.state.user! as IUser;

        const albumId = (this.state.albums![e.fromRow] as any).id;
        const result = await this.props.client.mutate<any>({
            mutation: UPDATE_ALBUM_MUTATION,
            variables: {
                data: {
                    authToken: user.token,
                    ...e.updated,
                    albumId
                }
            }
        });

        if (result.errors) {
            alert("There was an error trying to mutate the album.\nThis has occurred due to an invalid requested mutation.");
        }

        const newAlbums = [...(this.state.albums! as any[])];
        newAlbums[e.fromRow] = result.data!.updateAlbumData.data;

        this.setState({ albums: newAlbums });
    };

    private handleDelete = async (id: number) => {
        const user = userState.state.user! as IUser;

        await this.props.client.mutate<any>({
            mutation: DELETE_ALBUM_MUTATION,
            variables: {
                data: {
                    authToken: user.token,
                    albumId: id
                }
            }
        });

        const newAlbums = (this.state.albums! as any[]).filter(x => x.id !== id);
        this.setState({ albums: newAlbums });
    };
}

export default withApollo(Albums);
