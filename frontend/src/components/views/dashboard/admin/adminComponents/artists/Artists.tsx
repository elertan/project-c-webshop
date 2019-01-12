import * as React from "react";
import * as ReactDataGrid from "react-data-grid";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import gql from "graphql-tag";
import { Header} from "semantic-ui-react";
import { withApollo, WithApolloClient } from "react-apollo";

const GET_ARTISTS_QUERY = gql`
  {
    artists(first: 9999999) {
      items {
        id
        name
      }
    }
  }
`;

const columns = [
  { key: "id", name: "Id"},
  { key: "name", name: "Name", editable: true }
];
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

interface IProps {}
interface IState {
  artists: any[] | null;
}

class Artists extends React.Component<IProps & WithApolloClient<{}>, IState> {
  public state = {
    artists: null
  };

  public async componentDidMount() {
    const result = await this.props.client.query<any>({
      query: GET_ARTISTS_QUERY
    });

    this.setState({ artists: result.data.artists.items });
  }

  public render() {
    return (
      <div>
        <AdminMenu />
        <div style={styles.centerItems}>
          <Header as="h2">
            <div style={styles.centerItems}>Artists</div>
            <Header.Subheader>
              In this tab you can create, read, update and delete information
              regarding the artists
            </Header.Subheader>
          </Header>
        </div>
        {this.state.artists === null ?
          <p>Loading...</p>
          :
          <ReactDataGrid
            columns={columns}
            rowGetter={i => this.state.artists![i]}
            rowsCount={(this.state.artists! as any[]).length}
            enableCellSelect
          />
        }
      </div>
    );
  }
}

export default withApollo(Artists);
