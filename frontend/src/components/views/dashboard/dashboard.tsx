import * as React from "react";
import AppLayout from "../layout/AppLayout/AppLayout";
import {
  Table,
  Form,
  Button,
  Transition,
  Input
} from "semantic-ui-react";
import styles from "./dashboardStyle";
import DashboardMenu from "../reusable/DashboardMenu/DashboardMenu";

export default class Dashboard extends React.Component {
  public state = {
    visible: false,
    visibleButton: true,

    visibleEmail: false,
    visibleName: false,
    visiblePassword: false,

    visibleEmailButton: false,
    visibleNameButton: false,
    visiblePasswordButton: false,

    EMailButtonStyle: styles.NotClicked,
    nameButtonStyle: styles.NotClicked,
    passwordButtonStyle: styles.NotClicked
  };

  public toggleEmailVisibility = () =>
    this.setState({
      visibleEmail: !this.state.visibleEmail,
      visibleEmailButton: !this.state.visibleEmailButton,
      EMailButtonStyle: styles.Clicked
    });

  public toggleNameVisibility = () =>
    this.setState({
      visibleName: !this.state.visibleName,
      visibleNameButton: !this.state.visibleNameButton,
      nameButtonStyle: styles.Clicked
    });

  public togglePasswordVisibility = () =>
    this.setState({
      visiblePassword: !this.state.visiblePassword,
      visiblePasswordButton: !this.state.visiblePasswordButton,
      passwordButtonStyle: styles.Clicked
    });

  public render() {
    const { visibleEmailButton } = this.state;
    const { visibleNameButton } = this.state;
    const { visiblePasswordButton } = this.state;
    return (
      <AppLayout>
        <DashboardMenu/>
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
                    <div style={this.state.EMailButtonStyle}>
                      <Button
                        animated
                        size="large"
                        fluid
                        content={visibleEmailButton ? "Hide" : "Show"}
                        onClick={this.toggleEmailVisibility}
                      >
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>Verander e-mail</Button.Content>
                      </Button>
                    </div>
                    <Transition
                      visible={visibleEmailButton}
                      animation="scale"
                      duration={1000}
                    >
                      <div style={styles.InputSpacing}>
                        <Input placeholder="New E-mail" />
                        <Button color="green">Save</Button>
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
                  <Table.Cell height={110}>
                    <div style={this.state.nameButtonStyle}>
                      <Button
                        animated
                        size="large"
                        fluid
                        content={visibleNameButton ? "Hide" : "Show"}
                        onClick={this.toggleNameVisibility}
                      >
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>Verander naam</Button.Content>
                      </Button>
                    </div>
                    <Transition
                      visible={visibleNameButton}
                      animation="scale"
                      duration={1000}
                    >
                      <div style={styles.InputSpacing}>
                        <Input placeholder="Modify name" />
                        <Button color="green">Save</Button>
                      </div>
                    </Transition>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell width={5}>
                    <h3>
                      <b>Wachtwoord : </b>
                    </h3>
                    {"*******"}
                  </Table.Cell>
                  <Table.Cell height={110}>
                    <div style={this.state.passwordButtonStyle}>
                      <Button
                        animated
                        size="large"
                        fluid
                        content={visiblePasswordButton ? "Hide" : "Show"}
                        onClick={this.togglePasswordVisibility}
                      >
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>Change password</Button.Content>
                      </Button>
                    </div>
                    <Transition
                      visible={visiblePasswordButton}
                      animation="scale"
                      duration={1000}
                    >
                      <div style={styles.InputSpacing}>
                        <Input placeholder="New password" />
                        <Button color="green">Save</Button>
                      </div>
                    </Transition>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Form>
        </div>
      </AppLayout>
    );
  }
}
