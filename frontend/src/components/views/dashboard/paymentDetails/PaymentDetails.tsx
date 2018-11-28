import * as React from "react";
import AppLayout from "../../layout/AppLayout/AppLayout";
import { Dropdown, Table, Button, Header, Icon } from "semantic-ui-react";
import DashboardMenu from "../../reusable/DashboardMenu/DashboarMenu";

const styles = {
  DashboardPositioning: {
    display: "inline-block",
    width: "60%",
    padding: "3%"
  },
  HeaderPositioning: {
    margin: "3% 0 0 0"
  }
};

class PaymentDetails extends React.Component {
  public state = {};

  public render() {
    return (
      <AppLayout>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="payment" />
            <Header.Content>
              Payment Mehtods
              <Header.Subheader>
                Manage your payment preferences
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <DashboardMenu />
        <div style={styles.DashboardPositioning}>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <h3>IDeal</h3>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown text="Choose your bank">
                    <Dropdown.Menu>
                      <Dropdown.Item text="ING" />
                      <Dropdown.Divider />
                      <Dropdown.Item text="Rabobank" />
                      <Dropdown.Item text="ABN" />
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell />
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <h3>PayPal</h3>
                </Table.Cell>
                <Table.Cell>
                  <Button color="green">Redirect to paypal page</Button>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <h3>Nog een payment provider, creditcard ofso</h3>
                </Table.Cell>
                <Table.Cell />
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </AppLayout>
    );
  }
}

export default PaymentDetails;
