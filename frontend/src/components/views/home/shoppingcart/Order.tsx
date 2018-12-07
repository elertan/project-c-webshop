import * as React from "react";
import * as Yup from "yup";
import AppLayout from "../../layout/AppLayout/AppLayout";
import {
  Table,
  Header,
  Form,
  Icon,
  
  Step,
  Input,
  Label,
  Button
} from "semantic-ui-react";
import { Subscribe } from "unstated";
import CartState from "src/states/CartState";
import IProduct from "src/models/IProduct";
import { NavLink } from "react-router-dom";
import { Field, FieldProps, Formik, FormikProps } from "formik";
import { withApollo, WithApolloClient } from "react-apollo";
import OrderState from "src/states/OrderState";

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

interface IFormikValues {
  email: string;
}

const initialValues: IFormikValues = {
  email: ""
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Entered email is not a valid email")
});

class Order extends React.Component<WithApolloClient<IProps>> {
  public state = {
    errors: [],
    email: "",
    
    
  };
  public render() {
    return (
      <Subscribe to={[OrderState, CartState]}>{this.orderRender}</Subscribe>
      
    );
  }

  private orderRender = (orderState: OrderState, cartState: CartState) => {
    
    return (
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
                          <Table.Cell>Album: {product.album!.name}</Table.Cell>
                          <Table.Cell>Price</Table.Cell>
                        </Table.Row>
                      );
                    }
                    return (
                      <Table.Row key={i}>
                        <Table.Cell>Track: {product.track!.title}</Table.Cell>
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
                <Step active>
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
                      <h3>Shipping details</h3>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <h3>Emailaddress</h3>
                    </Table.Cell>
                    <Table.Cell>
                      <Formik
                        onSubmit={this.handleSubmit}
                        initialValues={initialValues}
                        render={this.renderFormik}
                        validationSchema={validationSchema}
                      />
                      
                      <NavLink onClick={() => orderState.addEmail(this.state.email)} to={"/shoppingcart/payment"}>}>hoi</NavLink>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  };

  private renderEmailField = (fieldProps: FieldProps<IFormikValues>) => {
    const error = fieldProps.form.touched.email && fieldProps.form.errors.email;
    return (
      <Form.Field >
        <Input 
          
          id="email"
          iconPosition="left"
          placeholder="johndoe@example.com"
          size="large"
          error={Boolean(error)}
        >
          <Icon name="at" />
          <input {...fieldProps.field} />
          
        </Input>
        {error && (
          <Label basic pointing="above" color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  };
  

  private handleSubmit = async (
    values: IFormikValues,
    formik: FormikProps<IFormikValues>,
   
  ) => {
    console.log("Handling submit");
    formik.setSubmitting(true);
    console.log("values: ", values);
    this.setState({ email: values.email });
    
    console.log("Result is: ");
  };

  

  private renderFormik = (formik: FormikProps<IFormikValues>) => {
    
    return (
      
      <Form  className="ui form" >
        <Field  name="email" render={this.renderEmailField} />
        <Button onClick={formik.submitForm}>submit</Button>
        {/* als ik op deze knop druk moet ik navigeren submitten en de state aanpassen dit laatste lukt niet */}
       
      </Form>
      
    );
  };
}

export default withApollo(Order);
