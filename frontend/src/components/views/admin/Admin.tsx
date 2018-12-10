import * as React from "react";
import { Segment, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import Users from "./adminComponents/users";
import Statistics from "./adminComponents/statistics";
import Overview from "./adminComponents/overview";
const styles = {
  size: {
    width: "15vw",
    margin: "1vw"
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
    }
    return (
      <div style={styles.size}>
        <Segment inverted>
          <Menu inverted pointing vertical secondary fluid>
            <NavLink to={"/admin/admin"}>
              <Menu.Item
                name="Overview"
                active={activeItem === "Overview"}
                onClick={() => this.changeMenuItem("Overview")}
              />
            </NavLink>
            <NavLink to={"/admin/admin"}>
              <Menu.Item
                name="Users"
                active={activeItem === "Users"}
                onClick={() => this.changeMenuItem("Users")}
              />
            </NavLink>
            <NavLink to={"/admin/admin"}>
              <Menu.Item
                name="Statistics"
                active={activeItem === "Statistics"}
                onClick={() => this.changeMenuItem("Statistics")}
              />
            </NavLink>
          </Menu>
        </Segment>
        {PageContent}
      </div>
    );
  }
}

export default Admin;
