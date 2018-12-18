import * as React from "react";
import { Header } from "semantic-ui-react";
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

class AddProduct extends React.Component {
  public render() {
    return (
      <div>
        <AdminMenu />
        <div style={styles.CenterItems}>
          <Header as="h2">
            <Header.Content>
              <div style={styles.CenterItems}>Add product</div>
              <Header.Subheader>
                Here you can add a new product to the webshop
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
      </div>
    );
  }
}

export default AddProduct;
