import * as React from "react";
import AppLayout from "../layout/AppLayout/AppLayout";
import { Menu, Divider } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default class Dashboard extends React.Component {
  public render() {
    return (
      <AppLayout>
        <br />
        <Menu vertical>
          <Menu.Item>
            <Menu.Header>Overzicht</Menu.Header>
            <br />
            <Divider />

            <Menu.Header>Bestellingen</Menu.Header>
            <NavLink to={"/dashboard/aankoopgeschiedenis"}>
              <Menu.Item name="Aankoopgeschiedenis" />
            </NavLink>
            <br />

            <Divider />
            <Menu.Header>Account details</Menu.Header>
            <NavLink to={"/dashboard/gegevens"}>
              <Menu.Item name="Mijn gegevens" />
            </NavLink>
            <NavLink to={"/dashboard/betaalmethoden"}>
              <Menu.Item name="Mijn betaalmethoden" />
            </NavLink>
            <NavLink to={"/dashboard/wachtwoordwijzigen"}>
              <Menu.Item name="Wachtwoord wijzigen" />
            </NavLink>
          </Menu.Item>
        </Menu>
      </AppLayout>
    );
  }
}
