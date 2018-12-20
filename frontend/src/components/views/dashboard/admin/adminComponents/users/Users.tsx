import * as React from "react";
import { Header, Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import * as ReactDataGrid from 'react-data-grid';
import Column = AdazzleReactDataGrid.Column;
import {Query} from "react-apollo";
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

const columns: Array<Column<any>> = [
  { key: "id", name: "Id" },
  { key: "email", name: "Email", editable: true },
  { key: "password", name: "Password", editable: true },
  { key: "firstname", name: "Firstname", editable: true },
  { key: "lastname", name: "Lastname", editable: true },
  { key: "dateOfBirth", name: "Date of birth", editable: true },
  { key: "token", name: "Token", editable: true }
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

class Users extends React.Component {
  public render() {
    const user = userState.state.user! as IUser;
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
          <Query
            query={GET_USERS_QUERY}
            variables={{ token: user.token }}
          >
            {(qData) => {
              if (qData.loading) {
                return <p>Loading...</p>;
              }
              if (qData.error) {
                return <p>{qData.error}</p>;
              }

              return (
                <ReactDataGrid
                  columns={columns}
                  rowGetter={i => qData.data.admin.users[i]}
                  rowsCount={qData.data.admin.users.length}
                  onGridRowsUpdated={this.handleGridRowsUpdated}
                  enableCellSelect
                />
              );
            }}
          </Query>
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

    alert(e.fromRow + " => " + JSON.stringify(e.updated));
  };
}

export default Users;
