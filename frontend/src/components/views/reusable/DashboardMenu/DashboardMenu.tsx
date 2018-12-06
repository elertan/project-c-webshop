import * as React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Divider } from "semantic-ui-react";
import styles from "./DashboardMenuStyles";
interface IProps {}

class DashboardMenu extends React.Component<IProps> {
  public render() {
    return (
      <div style={styles.SideMenu}>
        <Menu vertical>
          <Menu.Item>
          <Menu.Header>Overview</Menu.Header>
            <NavLink to={"/dashboard/overview"}>
            <Menu.Item name="Overview" />
            </NavLink>
            <Divider />
            <Menu.Header>Orders</Menu.Header>
            <NavLink to={"/dashboard/orderhistory"}>
              <Menu.Item name="Order History" />
            </NavLink>
            <Divider />
            <Menu.Header>Account details</Menu.Header>
            <NavLink to={"/dashboard/accountdetails"}>
              <Menu.Item name="My account details" />
            </NavLink>
            <NavLink to={"/dashboard/paymentmethods"}>
              <Menu.Item name="My payment methods" />
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default DashboardMenu;
