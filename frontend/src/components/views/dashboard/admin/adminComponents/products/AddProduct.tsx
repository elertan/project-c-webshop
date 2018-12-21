import * as React from "react";
import { Header } from "semantic-ui-react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu"

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

class AddProduct extends React.Component {
  public render() {
    return (
      <div>
        <AdminMenu />
        <div style={styles.centerItems}>
          <Header as="h2">
            <Header.Content>
              <div style={styles.centerItems}>Add product</div>
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
