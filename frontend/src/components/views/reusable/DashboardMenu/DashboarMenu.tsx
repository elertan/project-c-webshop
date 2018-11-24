import * as React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Divider } from "semantic-ui-react";

interface IProps {}

const styles = {
  SideMenu: {
    display: "inline-block",
    margin: "0 5% 0 0"
  }
};

class DashboardMenu extends React.Component<IProps> {
  public render() {
    return (
      <div style={styles.SideMenu}>
        <Menu vertical>
          <Menu.Item>
            <Menu.Header>Overzicht</Menu.Header>
            <Divider />
            <Menu.Header>Bestellingen</Menu.Header>
            <NavLink to={"/dashboard/aankoopgeschiedenis"}>
              <Menu.Item name="Aankoopgeschiedenis" />
            </NavLink>
            <Divider />
            <Menu.Header>Account details</Menu.Header>
            <NavLink to={"/dashboard/gegevens"}>
              <Menu.Item name="Mijn gegevens" />
            </NavLink>
            <NavLink to={"/dashboard/betaalmethoden"}>
              <Menu.Item name="Mijn betaalmethoden" />
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default DashboardMenu;
