import * as React from "react";
import { Header } from "semantic-ui-react";
import AdminBackButton from "../../../../reusable/AdminBackButton";

const styles = {
  MenuPadding: {
    padding: "2vw"
  },
  HeaderPositioning: {
    display: "flex",
    justifyContent: "center"
  }
};

class AllUsers extends React.Component {
  public render() {
    return (
      <div>
        <AdminBackButton />
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Header.Content>
              <div style={styles.HeaderPositioning}>All users</div>
              <Header.Subheader>
                All users
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
      </div>
    );
  }
}

export default AllUsers;
