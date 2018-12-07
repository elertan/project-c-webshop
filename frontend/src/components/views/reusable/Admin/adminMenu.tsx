import * as React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
interface IProps {}
const styles = {
  size: {
    width: "15vw",
    margin: "1vw"
  }
};
class AdminMenu extends React.Component<IProps> {
  public state = { activeItem: "home" };

  public changeMenuItem(name: string) {
    this.setState({
      activeItem: name
    });
  }
  public render() {
    const { activeItem } = this.state;
    return (
      <div style={styles.size}>
        <Segment inverted>
          <Menu inverted pointing vertical secondary fluid>
            <NavLink to={"/dashboard/overview"}>
              <Menu.Item
                name="Overview"
                active={activeItem === "Overview"}
                onClick={() => this.changeMenuItem("Overview")}
              />
            </NavLink>
            <Menu.Item
              name="Users"
              active={activeItem === "Users"}
              onClick={() => this.changeMenuItem("Users")}
            />
            <Menu.Item
              name="Statistics"
              active={activeItem === "Statistics"}
              onClick={() => this.changeMenuItem("Statistics")}
            />
          </Menu>
        </Segment>
      </div>
    );
  }
}

export default AdminMenu;
