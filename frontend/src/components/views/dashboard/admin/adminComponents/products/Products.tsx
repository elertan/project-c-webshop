import * as React from "react";
import { Icon, Header, Button } from "semantic-ui-react";
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

class Products extends React.Component {
  public state = { ActiveItem: "Home" };

  public changeMenuItem(name: string) {
    this.setState({
      ActiveItem: name
    });
  }

  public render() {
    return (
      <div>
        <AdminMenu />
        <div style={styles.CenterItems}>
          <Header as="h2">
            <Header.Content>
              <div style={styles.CenterItems}>Products</div>
              <Header.Subheader>
                In this tab you can add new songs or albums to the webshop,
                delete old songs or albums from the webshop and update
                information regarding the music avaliable in the webshop
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <br />
        <div style={styles.CenterItems}>
          <Button.Group basic size="massive">
            <NavLink to={"products/all"}>
              <Button animated="fade" size="massive">
                <Button.Content visible>
                  <Icon name="search" />
                  Find product
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="search" />
                  Find product
                </Button.Content>
              </Button>
            </NavLink>

            <Button.Or />

            <NavLink to={"products/addproduct"}>
              <Button animated="fade" size="massive">
                <Button.Content visible>
                  <Icon name="add" />
                  Add product
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="add" />
                  Add product
                </Button.Content>
              </Button>
            </NavLink>
          </Button.Group>
        </div>
      </div>
    );
  }
}

export default Products;
