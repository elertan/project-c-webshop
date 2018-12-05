import * as React from "react";

import AppLayout from "../../layout/AppLayout/AppLayout";
import { Table, Header, Icon, Button, Step, Dropdown } from "semantic-ui-react";
import { Subscribe } from "unstated";
import CartState from "src/states/CartState";
import IProduct from "src/models/IProduct";

interface IProps {}
const styles = {
  BankPositioning: {
    margin: "1.5%"
  },
  ShippingPositioning: {
    margin: "1.5%"
  },
  HeaderPositioning: {
    margin: "3%"
  },
  OrderPositioning: {
    width: "20%",
    margin: "0.75%"
  },
  OrderXBankXShipping: {
    display: "flex",
    flexwrap: "noWrap"
  },
  PaymentXShipping: {
    width: "60%"
  }
};
class Payment extends React.Component<IProps> {
  public render() {
    return (
      <Subscribe to={[CartState]}>
        {(cartState: CartState) => (
          <AppLayout>
            <div style={styles.HeaderPositioning}>
              <Header as="h2">
                <Icon name="payment" />
                <Header.Content>
                  Your order
                  <Header.Subheader>
                    Manage your order and make a payment
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </div>
            <div style={styles.OrderXBankXShipping}>
              <div style={styles.OrderPositioning}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan="2">
                        <h3>Order details</h3>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {cartState.state.products.map(
                      (product: IProduct, i: number) => {
                        if (product.album !== undefined) {
                          return (
                            <Table.Row key={i}>
                              <Table.Cell>
                                Album: {product.album!.name}
                              </Table.Cell>
                              <Table.Cell>prijs</Table.Cell>
                            </Table.Row>
                          );
                        }
                        return (
                          <Table.Row key={i}>
                            <Table.Cell>
                              track: {product.track!.title}
                            </Table.Cell>
                            <Table.Cell>prijs</Table.Cell>
                          </Table.Row>
                        );
                      }
                    )}
                  </Table.Body>
                </Table>
              </div>

              <div style={styles.PaymentXShipping}>
                <div style={styles.BankPositioning}>
                  <Step.Group widths={3} size="mini">
                    <Step>
                      <Icon name="truck" />
                      <Step.Content>
                        <Step.Title>Shipping</Step.Title>
                      </Step.Content>
                    </Step>
                    <Step active>
                      <Icon name="credit card" />
                      <Step.Content>
                        <Step.Title>Billing</Step.Title>
                      </Step.Content>
                    </Step>
                    <Step disabled>
                      <Icon name="info" />
                      <Step.Content>
                        <Step.Title>Confirm Order</Step.Title>
                      </Step.Content>
                    </Step>
                  </Step.Group>
                </div>

                <div style={styles.ShippingPositioning}>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell colSpan="2">
                          <h3>Payment details</h3>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <h3>IDeal</h3>
                        </Table.Cell>
                        <Table.Cell>
                          <Dropdown text="Choose your bank">
                            <Dropdown.Menu>
                              <Dropdown.Item text="ING" />
                              <Dropdown.Item text="Rabobank" />
                              <Dropdown.Item text="ABN" />
                            </Dropdown.Menu>
                          </Dropdown>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
                <Button positive floated="right">
                  next
                </Button>
              </div>
            </div>
          </AppLayout>
        )}
      </Subscribe>
    );
  }
}

export default Payment;
