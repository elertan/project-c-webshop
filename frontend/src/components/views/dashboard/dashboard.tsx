import * as React from "react";
import AppLayout from "../layout/AppLayout/AppLayout";
import {
  Menu,
  Divider,
  Table,
  Form,
  Grid,
  Button,
  Transition
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import styles from "./dashboardStyle";

export default class Dashboard extends React.Component {
  public state = { visible: false, visibleButton: true, buttonClass: styles.NotClicked };

  public toggleVisibility = () =>
    this.setState({
      visible: !this.state.visible,
      visibleButton: !this.state.visibleButton,
      buttonClass: "styles.Clicked"
    });

  public render() {
    const { visible } = this.state;
    const { visibleButton } = this.state;
    return (
      <AppLayout>
        <div style={styles.DashboardDiv}>
          {/* Side menu  */}
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

          <div style={styles.DashboardTable}>
            <Form>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <h3>
                        <b>Email : </b>
                      </h3>
                      {"tim-prins@live.nl"}
                    </Table.Cell>

                    <Table.Cell height={110}>
                      <Transition
                        visible={visibleButton}
                        duration={0}
                      >
                      <div style={this.state.buttonClass}>
                        <Button
                          animated
                          size="large"
                          fluid
                          content={visible ? "Hide" : "Show"}
                          onClick={this.toggleVisibility}
                        >
                          <Button.Content visible>Edit</Button.Content>
                          <Button.Content hidden>
                            Verander e-mail
                          </Button.Content>
                        </Button>
                        </div>
                      </Transition>

                      <Transition
                        visible={visible}
                        animation="scale"
                        duration={1000}
                      >
                        <div style={styles.InputPosition}>
                          <Form.Field control="input" placeholder="E-Mail" />
                          <Transition
                            visible={visible}
                            animation="scale"
                            duration={1000}
                          >
                            <Button size="large" fluid>
                              <Button.Content visible>Save</Button.Content>
                            </Button>
                          </Transition>
                        </div>
                      </Transition>
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
            </Form>
          </div>
        </div>

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
