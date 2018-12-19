import * as React from "react";
import { Header, Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import AdminMenu from "../../../../reusable/Admin/AdminMenu"

const styles = {
  MenuPadding: {
    padding: "2vw"
  },
  CenterItems: {
    paddingTop: "10vh",
    display: "flex",
    justifyContent: "center"
  }
};

class Users extends React.Component {
  public render() {
    return (
      <div>
        <AdminMenu />
        <div style={styles.CenterItems}>
          <Header as="h2">
            <Header.Content>
              <div style={styles.CenterItems}>User accounts</div>
              <Header.Subheader>
                In this tab you can create, read, update and delete information
                regarding the users
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <br />
        <div style={styles.CenterItems}>
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
}

export default Users;
