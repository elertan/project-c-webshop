import * as React from "react";
import AppLayout from "../layout/AppLayout/AppLayout";
import { Menu, Divider, Table, Form, Grid, Button } from "semantic-ui-react";
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

        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={5}>
                <h3>
                  <b>Email : </b>
                </h3>
                {"tim-prins@live.nl"}
              </Table.Cell>
              <Table.Cell>
                <Button animated size="large" fluid>
                  <Button.Content visible>Edit</Button.Content>
                  <Button.Content hidden>Verander e-mail</Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={5}>
                <h3>
                  <b>Naam : </b>
                </h3>
                {"Tim Prins"}
              </Table.Cell>
              <Table.Cell>
                <Button animated size="large" fluid>
                  <Button.Content visible>Edit</Button.Content>
                  <Button.Content hidden>Verander naam</Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={5}>
                <h3>
                  <b>Wachtwoord : </b>
                </h3>
                {"*******"}
              </Table.Cell>
              <Table.Cell>
                <Button animated size="large" fluid>
                  <Button.Content visible>Edit</Button.Content>
                  <Button.Content hidden>Nieuw wachtwoord</Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Form>
          <Grid columns="two">
            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  label={"Huidige naam hoort hier"}
                  control="input"
                  placeholder="Naam"
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  label={"Huidige achternaam hoort hier"}
                  control="input"
                  placeholder="Achternaam"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <h1>test</h1>
              </Grid.Column>
              <Grid.Column>
                <h1>test</h1>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </AppLayout>
    );
  }
}
