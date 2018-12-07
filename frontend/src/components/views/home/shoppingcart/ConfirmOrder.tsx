import * as React from "react";

import AppLayout from "../../layout/AppLayout/AppLayout";
import { Table, Header, Icon, Button, Step, } from "semantic-ui-react";
import { Subscribe } from "unstated";
import CartState from "src/states/CartState";
import IProduct from "src/models/IProduct";
import OrderState from "src/states/OrderState";
import gql from "graphql-tag";
import { WithApolloClient, withApollo } from "react-apollo";


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

const createAnonymousOrderMutation = gql`
mutation ($data: CreateAnonymousOrderInput!) {
    createAnonymousOrder(data: $data) {
      data {
        user {
          anonymousRegistrationToken
          email
        }
      }
      errors {
        message
      }
    }
  }
`;

class ConfirmOrder extends React.Component<WithApolloClient<IProps>> {
  public render() {
    return (
     
    <Subscribe to={[OrderState, CartState]}>{this.confirmOrderRender}</Subscribe>
    )};


  private confirmOrderRender = (orderState: OrderState, cartState: CartState) => {
    return(

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
                              <Table.Cell>Price</Table.Cell>
                            </Table.Row>
                          );
                        }
                        return (
                          <Table.Row key={i}>
                            <Table.Cell>
                              track: {product.track!.title}
                            </Table.Cell>
                            <Table.Cell>Price</Table.Cell>
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
                    <Step disabled>
                      <Icon name="truck" />
                      <Step.Content>
                        <Step.Title>Shipping</Step.Title>
                      </Step.Content>
                    </Step>
                    <Step disabled>
                      <Icon name="credit card" />
                      <Step.Content>
                        <Step.Title>Billing</Step.Title>
                      </Step.Content>
                    </Step>
                    <Step active>
                      <Icon name="info" />
                      <Step.Content>
                        <Step.Title>Confirm Order</Step.Title>
                      </Step.Content>
                    </Step>
                  </Step.Group>
                </div>
                <p>your email : {orderState.state.email}</p>
                <Button positive floated="right" onClick={() => this.handleSubmit(orderState.state.email, orderState.state.productIds, cartState.state.products)}>
                  Order
                </Button>
              </div>
            </div>
          </AppLayout>
        )}
                    
        private handleSubmit = async (newEmail: string, productIds: number[], cartproducts: number[]) => {
            console.log("Handling submit");
            productIds = cartproducts;
           
            const result = await this.props.client.mutate({
                mutation: createAnonymousOrderMutation,
                variables: {
                    data: {
                        email: newEmail,
                        productIds: [1]
                    }
                }
            });
            console.log("Result is: ", result);

                    }
                }

export default withApollo(ConfirmOrder);
