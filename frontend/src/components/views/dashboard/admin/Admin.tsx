import * as React from "react";
import { Menu } from "semantic-ui-react";
import Users from "./adminComponents/users";
import Statistics from "./adminComponents/statistics";
import Overview from "./adminComponents/overview";
import Products from "./adminComponents/products";

const styles = {
  MenuPadding: {
    height: "3vw",
    display: "inline-block"
  }
};

class Admin extends React.Component {
  public state = { activeItem: "Overview" };

  public changeMenuItem(name: string) {
    this.setState({
      activeItem: name
    });
  }

  public render() {
    const { activeItem } = this.state;
    let PageContent = <h1>Hi</h1>;
    if (this.state.activeItem === "Overview") {
      PageContent = <Overview />;
    } else if (this.state.activeItem === "Users") {
      PageContent = <Users />;
    } else if (this.state.activeItem === "Statistics") {
      PageContent = <Statistics />;
    } else if (this.state.activeItem === "Products") {
      PageContent = <Products />;
    }
    return (
      <div>
        <div style={styles.MenuPadding}>
          <Menu inverted fixed="top" fluid>
            <Menu.Item
              name="Overview"
              active={activeItem === "Overview"}
              onClick={() => this.changeMenuItem("Overview")}
            />
            <Menu.Item
              name="Users"
              active={activeItem === "Users"}
              onClick={() => this.changeMenuItem("Users")}
            />
            <Menu.Item
              name="Products"
              active={activeItem === "Products"}
              onClick={() => this.changeMenuItem("Products")}
            />
            <Menu.Item
              name="Statistics"
              active={activeItem === "Statistics"}
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
