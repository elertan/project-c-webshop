import * as React from "react";
import { Header, Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import * as ReactDataGrid from 'react-data-grid';
import Column = AdazzleReactDataGrid.Column;
import { withApollo, WithApolloClient} from "react-apollo";
import {userState} from "../../../../../../index";
import IUser from "../../../../../../models/IUser";
import gql from "graphql-tag";
import GridRowsUpdatedEvent = AdazzleReactDataGrid.GridRowsUpdatedEvent;

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
  { key: "email", name: "Email", editable: true },
  { key: "password", name: "Password", editable: true },
  { key: "firstname", name: "Firstname", editable: true },
  { key: "lastname", name: "Lastname", editable: true },
  { key: "dateOfBirth", name: "Date of birth", editable: true },
  { key: "token", name: "Token", editable: true },
];

const GET_USERS_QUERY = gql`
query x($token: String!){
  admin(token: $token) {
    users {
      id
      email
      password
      firstname
      lastname
      dateOfBirth
      token
      anonymousRegistrationToken
    }
  }
}
`;

const UPDATE_USER_MUTATION = gql`
mutation q($data: UpdateUserDataInput!) {
  updateUserData(data: $data) {
    data {
      id
      email
      dateOfBirth
      firstname
      lastname
      password
      token 
    }
  }
}
`;

const DELETE_USER_MUTATION = gql`
mutation q($data: DeleteUserDataInput!) {
  deleteUser(data: $data) {
    errors {
      message
    }
  }
}
`;

interface IProps {}
interface IState {
  users: any[] | null;
}

class Users extends React.Component<IProps & WithApolloClient<{}>, IState> {
  public state = {
    users: null
  };

  public async componentDidMount() {
    const user = userState.state.user! as IUser;

    const result = await this.props.client.query<any>({
      query: GET_USERS_QUERY,
      variables: {
        token: user.token
      }
    });

    this.setState({ users: result.data.admin.users });
  }

  public render() {
    return (
      <div>
        <AdminMenu />
        <div style={styles.centerItems}>
          <Header as="h2">
            <div style={styles.centerItems}>User accounts</div>
            <Header.Subheader>
              In this tab you can create, read, update and delete information
              regarding the users
            </Header.Subheader>
          </Header>
        </div>
        <div style={{
          margin: 20
        }}>
          {this.state.users === null ?
            <p>Loading...</p>
            :
            <ReactDataGrid
              columns={columns(this.handleDelete)}
              rowGetter={i => this.state.users![i]}
              rowsCount={(this.state.users! as any[]).length}
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
                  Find user
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="search" />
                  Find user
                </Button.Content>
              </Button>
            </NavLink>

            <Button.Or />

            <NavLink to={"users/adduser"}>
              <Button animated="fade" size="massive">
                <Button.Content visible>
                  <Icon name="add" />
                  Add user
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="add" />
                  Add user
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
    const userId = (this.state.users![e.fromRow] as any).id;
    try {
      const result = await this.props.client.mutate<any>({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          data: {
            authToken: user.token,
            ...e.updated,
            userId
          }
        }
      });

      const newUsers = [...(this.state.users! as any[])];
      newUsers[e.fromRow] = result.data!.updateUserData.data;

      this.setState({ users: newUsers });
    } catch {
      alert("There was an error trying to mutate the user.\nThis has occurred due to an invalid requested mutation.");
    }
  };

  private handleDelete = async (id: number) => {
    const user = userState.state.user! as IUser;

    await this.props.client.mutate<any>({
      mutation: DELETE_USER_MUTATION,
      variables: {
        data: {
          authToken: user.token,
          userId: id
        }
      }
    });

    const newUsers = (this.state.users! as any[]).filter(x => x.id !== id);
    this.setState({ users: newUsers });
  };
}

export default withApollo(Users);
