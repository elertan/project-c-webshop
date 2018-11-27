import * as React from "react";
import AppLayout from "../../../layout/AppLayout/AppLayout";
import { Table, Form } from "semantic-ui-react";
import DashboardMenu from "../../../reusable/DashboardMenu/DashboarMenu";

const styles = {
  DashboardPositioning: {
    display: "inline-block",
    width: "60%",
    padding: "3%"
  }
};

class PasswordReset extends React.Component {
  public state = {};

  public render() {
    return (
      <AppLayout>
        <DashboardMenu />
        <div style={styles.DashboardPositioning}>
          <Form>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell />
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
