import * as React from "react";
import AppLayout from "../../layout/AppLayout/AppLayout";
import {
  Table,
  Form,
  Button,
  Transition,
  Input,
  Header,
  Icon
} from "semantic-ui-react";
import styles from "./AccountDetailsStyle";
import DashboardMenu from "../../reusable/DashboardMenu/DashboarMenu";
import { NavLink } from "react-router-dom";

class AccountDetails extends React.Component {
  public state = {
    visible: false,
    visibleButton: true,

    visibleEmail: false,
    visibleName: false,

    visibleEmailButton: false,
    visibleNameButton: false,

    EMailButtonStyle: styles.NotClicked,
    nameButtonStyle: styles.NotClicked
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

  public render() {
    const { visibleEmailButton } = this.state;
    const { visibleNameButton } = this.state;
    return (
      <AppLayout>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="settings" />
            <Header.Content>
              Account Details
              <Header.Subheader>Manage your account preferences</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <DashboardMenu />

        <div style={styles.DashboardPositioning}>
          <Form>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <h3>
                      <b>E-mail : </b>
                    </h3>
                    {"tim-prins@live.nl"}
                  </Table.Cell>
                  <Table.Cell>
                    <div style={this.state.EMailButtonStyle}>
                      <Button
                        animated
                        size="large"
                        fluid
                        content={visibleEmailButton ? "Hide" : "Show"}
                        onClick={this.toggleEmailVisibility}
                      >
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>Change e-mail</Button.Content>
                      </Button>
                    </div>
                    <Transition
                      visible={visibleEmailButton}
                      animation="scale"
                      duration={1000}
                    >
                      <div style={styles.InputSpacing}>
                        <Input placeholder="New E-mail" />
                        <div style={styles.SaveButtonPosition}>
                          <Button color="green">Save</Button>
                        </div>
                      </div>
                    </Transition>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell width={5}>
                    <h3>
                      <b>Name : </b>
                    </h3>
                    {"Tim Prins"}
                  </Table.Cell>
                  <Table.Cell>
                    <div style={this.state.nameButtonStyle}>
                      <Button
                        animated
                        size="large"
                        fluid
                        content={visibleNameButton ? "Hide" : "Show"}
                        onClick={this.toggleNameVisibility}
                      >
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>Change name</Button.Content>
                      </Button>
                    </div>
                    <Transition
                      visible={visibleNameButton}
                      animation="scale"
                      duration={1000}
                    >
                      <div style={styles.InputSpacing}>
                        <Input placeholder="Modify name" />
                        <div style={styles.SaveButtonPosition}>
                          <Button color="green">Save</Button>
                        </div>
                      </div>
                    </Transition>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell width={5}>
                    <h3>
                      <b>Password : </b>
                    </h3>
                    {"*******"}
                  </Table.Cell>
                  <Table.Cell>
                    <div style={styles.NotClicked}>
                      <NavLink to={"/dashboard/accountdetails/passwordreset"}>
                        <Button animated size="large" fluid>
                          <Button.Content visible>Edit</Button.Content>
                          <Button.Content hidden>
                            Change password
                          </Button.Content>
                        </Button>
                      </NavLink>
                    </div>
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

export default AccountDetails;
