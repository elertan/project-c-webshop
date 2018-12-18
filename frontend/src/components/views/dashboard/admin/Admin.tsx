import * as React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import Users from "./adminComponents/users";
import Statistics from "./adminComponents/statistics";
import Products from "./adminComponents/products";

const styles = {
  MenuPadding: {
    height: "3vw",
    display: "inline-block"
  },
  CenterItems: {
    display: "flex",
    justifyContent: "center"
  }
};

class Admin extends React.Component {
  public state = { ActiveItem: "Overview" };

  public changeMenuItem(name: string) {
    this.setState({
      ActiveItem: name
    });
  }

  public render() {
    const { ActiveItem } = this.state;
    let PageContent;
    if (this.state.ActiveItem === "Overview") {
      PageContent = (
        <div style={styles.CenterItems}>
          <Button.Group basic size="massive">
            <Button
              animated="fade"
              size="massive"
              onClick={() => this.changeMenuItem("Users")}
            >
              <Button.Content visible>
                {" "}
                <Icon name="users" />
                Users
              </Button.Content>
              <Button.Content hidden>
                {" "}
                <Icon name="users" />
                Users
              </Button.Content>
            </Button>

            <Button.Or />

            <Button
              animated="fade"
              size="massive"
              onClick={() => this.changeMenuItem("Products")}
            >
              <Button.Content visible>
                {" "}
                <Icon name="sound" />
                Products
              </Button.Content>
              <Button.Content hidden>
                {" "}
                <Icon name="sound" />
                Products
              </Button.Content>
            </Button>

            <Button.Or />

            <Button
              animated="fade"
              size="massive"
              onClick={() => this.changeMenuItem("Statistics")}
            >
              <Button.Content visible>
                {" "}
                <Icon name="line graph" />
                Statistics
              </Button.Content>
              <Button.Content hidden>
                {" "}
                <Icon name="line graph" />
                Statistics
              </Button.Content>
            </Button>
          </Button.Group>
        </div>
      );
    } else if (this.state.ActiveItem === "Users") {
      PageContent = <Users />;
    } else if (this.state.ActiveItem === "Statistics") {
      PageContent = <Statistics />;
    } else if (this.state.ActiveItem === "Products") {
      PageContent = <Products />;
    }

    return (
      <div>
        <div style={styles.MenuPadding}>
          <Menu inverted fixed="top" fluid>
            <Menu.Item
              name="Overview"
              header={ActiveItem === "Overview"}
              onClick={() => this.changeMenuItem("Overview")}
            />
            <Menu.Item
              name="Users"
              header={ActiveItem === "Users"}
              onClick={() => this.changeMenuItem("Users")}
            />
            <Menu.Item
              name="Products"
              header={ActiveItem === "Products"}
              onClick={() => this.changeMenuItem("Products")}
            />
            <Menu.Item
              name="Statistics"
              header={ActiveItem === "Statistics"}
              onClick={() => this.changeMenuItem("Statistics")}
            />
          </Menu>
        </div>
        <div>{PageContent}</div>
      </div>
    );
  }
}

export default Admin;
