import * as React from "react";
import AppLayout from "../../../layout/AppLayout/AppLayout";
import { Table, Form, Input, Button } from "semantic-ui-react";
import DashboardMenu from "../../../reusable/DashboardMenu/DashboarMenu";

const styles = {
  DashboardPositioning: {
    display: "inline-block",
    width: "60%",
    padding: "3%"
  }
};

class PasswordReset extends React.Component {
  public state = {
    ButtonText: "Show all passwords",
    PasswordInput: "password"
  };

  public toggleOldPasswordVisibility = () =>
    this.setState({
      ButtonText: "Hide all passwords",
      PasswordInput: ""
    });

  public render() {
    return (
      <AppLayout>
        <DashboardMenu />
        <div style={styles.DashboardPositioning}>
          <Form>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <h3>Current password :</h3>
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      placeholder="Current password"
                      type={this.state.PasswordInput}
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <h3>New password :</h3>
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      placeholder="New password"
                      type={this.state.PasswordInput}
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <h3>Confirm new password :</h3>
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      placeholder="New password"
                      type={this.state.PasswordInput}
                    />
                  </Table.Cell>
                </Table.Row>

                <Table.Row textAlign="center">
                  <Table.Cell>
                    <Button color="green">Done</Button>
                    <Button
                      color="blue"
                      onClick={this.toggleOldPasswordVisibility}
                    >
                      {this.state.ButtonText}
                    </Button>
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

export default PasswordReset;
