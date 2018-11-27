import * as React from "react";
import AppLayout from "../../layout/AppLayout/AppLayout";
import { Dropdown, Form, Table } from "semantic-ui-react";
import DashboardMenu from "../../reusable/DashboardMenu/DashboarMenu";

class PaymentDetails extends React.Component {
  public state = {};

  public render() {
    return (
      <AppLayout>
        <DashboardMenu />
        <Form>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <h1>Ideal</h1>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    text="Filter Posts"
                    icon="filter"
                    floating
                    labeled
                    button
                    className="icon"
                  >
                    <Dropdown.Menu>
                      <Dropdown.Divider />
                      <Dropdown.Header icon="tags" content="Kies uw bank" />
                      <Dropdown.Menu scrolling>
                        <h1> Ideal </h1>
                        <h1> Ideal </h1>
                        <h1> Ideal </h1>
                        <h1> Ideal </h1>
                      </Dropdown.Menu>
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Form>
        <h1> PaymentDetails </h1>
      </AppLayout>
    );
  }
}

export default PaymentDetails;
