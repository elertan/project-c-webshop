import * as React from "react";
import { Menu, Header } from "semantic-ui-react";

const styles = {
  MenuPadding: {
    padding: "2vw"
  },
  HeaderPositioning: {
    display: "flex",
    justifyContent: "center"
  }
};

class Users extends React.Component {
  public render() {
    return (
      <div>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Header.Content>
              <div style={styles.HeaderPositioning}>User accounts</div>
              <Header.Subheader>
                In this tab you can create, read, update and delete information
                regarding the users
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={styles.MenuPadding}>
          <Menu vertical>
            <Menu.Item>
              <Header size="small">User accounts</Header>
              <Menu.Item name="All accounts" />
              <Menu.Item name="Add new account" />
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default Users;
