import * as React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Divider, Header } from "semantic-ui-react";
import styles from "./DashboardMenuStyles";
interface IProps {}

class DashboardMenu extends React.Component<IProps> {
  public render() {
    return (
      <div style={styles.SideMenu}>
        <Menu vertical>
          <Menu.Item>
            {/* User dashboard overview section */}
            <NavLink to={"/dashboard/overview"}>
              <Header size="small">Overview</Header>
            </NavLink>
            <Divider />

            {/* Orders section */}
            <NavLink to={"/dashboard/orderhistory"}>
              <Header size="small">Content</Header>
            </NavLink>
            <NavLink to={"/dashboard/purchased"}>
              <Menu.Item name="Purchased Products" />
            </NavLink>
            <NavLink to={"/dashboard/orderhistory"}>
              <Menu.Item name="Order History" />
            </NavLink>
            <Divider />

            {/* Account details section */}
            <NavLink to={"/dashboard/accountdetails"}>
              <Header size="small">Account Details</Header>
            </NavLink>
            <NavLink to={"/dashboard/accountdetails/namereset"}>
              <Menu.Item name="Change name" />
            </NavLink>
            <NavLink to={"/dashboard/accountdetails/birthreset"}>
              <Menu.Item name="Change birthdate" />
            </NavLink>
            <NavLink to={"/dashboard/accountdetails/emailreset"}>
              <Menu.Item name="Change Email" />
            </NavLink>
            <NavLink to={"/dashboard/accountdetails/passwordreset"}>
              <Menu.Item name="Reset password" />
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default DashboardMenu;
