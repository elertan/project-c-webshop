import * as React from "react";
import { Header } from "semantic-ui-react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";

const styles = {
  menuPadding: {
    padding: "2vw"
  },
  centerItems: {
    paddingTop: "10vh",
    display: "flex",
    justifyContent: "center"
  }
};

class AddUser extends React.Component {
  public render() {
    return (
      <div>
        <AdminMenu />
        <div style={styles.centerItems}>
          <Header as="h2">
            <Header.Content>
              <div style={styles.centerItems}>Add user</div>
              <Header.Subheader>Add user</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
      </div>
    );
  }
}

export default AddUser;
