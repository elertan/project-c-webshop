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
  Button,
} from "semantic-ui-react";
import {Subscribe} from "unstated";
import CartState from "src/states/CartState";
import IProduct from "src/models/IProduct";
import {Redirect} from "react-router-dom";
import {Field, FieldProps, Formik, FormikProps} from "formik";
import {withApollo, WithApolloClient} from "react-apollo";
import OrderState from "src/states/OrderState";
import gql from "graphql-tag";
import IApiResult from "src/models/IApiResult";
import IUser from "src/models/IUser";
import IApiError from "src/models/IApiError";

const createAnonymousOrderMutation = gql`
  mutation($data: CreateAnonymousOrderInput!) {
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

interface IProps {
}

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
  status: string;
  bank: number | null;
}

const initialValues: IFormikValues = {
  email: "",
  status: "email",
  bank: null
};

const bankOptions = [
  "ING",
  "ABN Amro",
  "Rabobank"
];

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Entered email is not a valid email")
});

class Order extends React.Component<WithApolloClient<IProps>> {
  public state = {
    errors: [],
    email: "",
    status: "email",
    value: "",

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
            <Icon name="payment"/>
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
                          <Table.Cell>Price: </Table.Cell>
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
                <Step
                  active={this.state.status === "email"}
                  disabled={this.state.status !== "email"}
                >
                  <Icon name="truck"/>
                  <Step.Content>
                    <Step.Title>Shipping</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={this.state.status === "bank"}
                  disabled={this.state.status !== "bank"}
                >
                  <Icon name="credit card"/>
                  <Step.Content>
                    <Step.Title>Billing</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={this.state.status === "confirm"}
                  disabled={this.state.status !== "confirm"}
                >
                  <Icon name="info"/>
                  <Step.Content>
                    <Step.Title>Confirm Order</Step.Title>
                  </Step.Content>
                </Step>
              </Step.Group>
            </div>
            <div style={styles.ShippingPositioning}>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Formik
                        onSubmit={this.handleSubmit}
                        initialValues={initialValues}
                        render={this.renderFormik}
                        validationSchema={validationSchema}
                      />
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
      <Form.Field>
        <Table.HeaderCell colSpan="2">
          <h3>Shipping details</h3>
        </Table.HeaderCell>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Emailaddress</Table.Cell>
            <Table.Cell/>
            <Table.Cell>
              <Input
                id="email"
                iconPosition="left"
                placeholder="johndoe@example.com"
                size="large"
                error={Boolean(error)}
              >
                <Icon name="at"/>
                <input {...fieldProps.field} />
              </Input>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Button
          floated="right"
          disabled={!fieldProps.form.isValid}
          onClick={() => this.setStatus("bank")}
          positive
        >
          Next
        </Button>
        {error && (
          <Label basic pointing="above" color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  };

  private renderBankField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <Form.Field>
        <Table.HeaderCell colSpan="2">
          <h3>Billing details</h3>
        </Table.HeaderCell>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Bank:</Table.Cell>
            <Table.Cell/>
            <Table.Cell>
              <select
                value={String(fieldProps.field.value)}
                onChange={ev => fieldProps.form.setFieldValue(fieldProps.field.name, Number(ev.target.value))}
              >
                <option value={String(null)} disabled>Choose your bank</option>
                {bankOptions.map((bank, i) => (
                  <option key={i} value={String(i)}>{bank}</option>
                ))}
              </select>
            </Table.Cell>
            <p>{this.state.value}</p>
          </Table.Row>
        </Table.Body>
        <Button positive floated="right" onClick={() => this.setStatus("confirm")} disabled={fieldProps.field.value === null}>Next</Button>
      </Form.Field>
    );
  };


  private renderConfirmationField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <Form.Field>
        <p>your email is: {fieldProps.form.values.email}</p>
        <p>your bank is: {bankOptions[fieldProps.form.values.bank!]}</p>
        <Button
          onClick={() => this.handleOrder(fieldProps.form.values.email)}
        >
          Send
        </Button>
      </Form.Field>
    );
  };

  private handleSubmit = async (
    values: IFormikValues,
    formik: FormikProps<IFormikValues>
  ) => {
    console.log("Handling submit");
    formik.setSubmitting(true);
    console.log("values: ", values);
    console.log("Result is: ");
  };

  private handleOrder = async (newEmail: string) => {
    console.log("Handling submit");

    const result = await this.props.client.mutate({
      mutation: createAnonymousOrderMutation,
      variables: {
        data: {
          email: newEmail,
          productIds: [1]
        }
      }
    });

    const apiResult = result.data!.createAnonymousOrder as IApiResult<IUser>;
    if (apiResult.errors) {
      this.setState({errors: apiResult.errors})
      console.log(apiResult.errors)

    } else {
      if (this.state.errors.length > 0) {
        this.setState({errors: []})

        return <Redirect to="/confirmorder"/>
      }
      return <Redirect to="./confirmorder"/>
    }
    return <Redirect to="./confirmorder"/>
  };


  private setStatus = (newStatus: string) => {
    this.setState({status: newStatus});
  };

  private renderFormik = (formik: FormikProps<IFormikValues>) => {
    if (this.state.status === "email") {
      return (
        <Form className="ui form">
          <Field name="email" render={this.renderEmailField}/>
        </Form>
      );
    }
    if (this.state.status === "bank") {
      return (
        <Form className="ui form">
          <Field name="bank" render={this.renderBankField}/>
        </Form>
      );
    }
    return (
      <Form className="ui form">
        <Field name="confirm" render={this.renderConfirmationField}/>
        {this.state.errors.length > 0 &&
        <p
          style={{textAlign: 'center', marginTop: 15, color: 'red'}}>{(this.state.errors[0] as IApiError).message}</p>
        }
      </Form>
    );
  };
}

export default withApollo(Order);
