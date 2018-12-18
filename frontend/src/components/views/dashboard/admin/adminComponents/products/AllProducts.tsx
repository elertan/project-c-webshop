import * as React from "react";
import { Header } from "semantic-ui-react";

const styles = {
  MenuPadding: {
    padding: "2vw"
  },
  HeaderPositioning: {
    display: "flex",
    justifyContent: "center"
  }
};

class AllProducts extends React.Component {
  public render() {
    return (
      <div style={styles.HeaderPositioning}>
        <Header as="h2">
          <Header.Content>
            <div style={styles.HeaderPositioning}>All products</div>
            <Header.Subheader>
              An overview of all products currently in the webshop
            </Header.Subheader>
          </Header.Content>
        </Header>
      </div>
    );
  }
}

export default AllProducts;
