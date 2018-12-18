import * as React from "react";
import * as Yup from "yup";
import AppLayout from "../../layout/AppLayout/AppLayout";
import {
  Table,
  Form,
  Icon,
  Step,
  Button,
  Label,
  Divider,
  Input,
  Segment,
  Loader
} from "semantic-ui-react";
import { Subscribe } from "unstated";
import CartState from "src/states/CartState";

import { Field, FieldProps, Formik, FormikProps } from "formik";
import { withApollo, WithApolloClient } from "react-apollo";
import OrderState from "src/states/OrderState";
import gql from "graphql-tag";
import IApiResult from "src/models/IApiResult";
import IUser from "src/models/IUser";
import IApiError from "src/models/IApiError";
import LoginPopupContent from "../../layout/AppLayout/Menu/LoginPopupContent";
import IProduct from "src/models/IProduct";

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

interface IProps {}

const styles = {
  OrderPositioning: {
    width: "30%",
    margin: "0.75%"
  },
  PaymentXShipping: {
    width: "150%",
    margin: "1.7%"
  }
};

interface IFormikValues {
  email: string;
  status: string;
  bank: number | null;
  bankNumber: number | null;
  products: IProduct[];
}

const initialValues: IFormikValues = {
  email: "",
  status: "option",
  bank: null,
  bankNumber: null,
  products: []
};

const bankOptions = ["ING", "ABN Amro", "Rabobank"];

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Entered email is not a valid email")
});

class Order extends React.Component<WithApolloClient<IProps>> {
  public state = {
    errors: [],
    email: "",
    status: "option",
    value: "",
    radio: true,
    time: true,
   
  };

  public render() {
    return (
      <Subscribe to={[OrderState, CartState]}>{this.orderRender}</Subscribe>
    );
  }

  private orderRender = (orderState: OrderState, cartState: CartState) => {
    initialValues.products = cartState.state.products;

    return (
      <AppLayout>
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={initialValues}
          render={this.renderFormik}
          validationSchema={validationSchema}
        />
      </AppLayout>
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

  private handleOrder = async (
    newEmail: string,
    boughtProducts: number[]
  ) => {
    console.log("Handling submit");

    const result = await this.props.client.mutate({
      mutation: createAnonymousOrderMutation,
      variables: {
        data: {
          email: newEmail,
          productIds: boughtProducts
        }
      }
    });

    const apiResult = result.data!.createAnonymousOrder as IApiResult<IUser>;
    if (apiResult.errors) {
      this.setState({ errors: apiResult.errors });
      console.log(apiResult.errors);
    } else {
      if (this.state.errors.length > 0) {
        this.setState({ errors: [] });
      }
      else{
        this.startTimeout()
        this.setStatus("succes");
      }
    }
  };

  private setStatus = (newStatus: string) => {
    this.setState({ status: newStatus });
  };
  private startTimeout = () => {
    setTimeout(()=>{
      this.setState({time: false});},
    
 5000);
   
  }

  private renderFormik = (formik: FormikProps<IFormikValues>) => {
    if (this.state.status === "option") {
      return (
        <Form className="ui form">
          <Field name="option" render={this.renderOptionMenu} />
        </Form>
      );
    }

    if (this.state.status === "order") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Field name="submenu" render={this.renderProducts} />

          <div>
            <Field name="submenu" render={this.renderStatusBar} />
            <Form className="ui form">
              <Field name="order" render={this.RenderOrderField} />
            </Form>
          </div>
        </div>
      );
    }

    if (this.state.status === "bank") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Field name="submenu" render={this.renderProducts} />

          <div>
            <Field name="submenu" render={this.renderStatusBar} />
            <Form className="ui form">
              <Field name="bank" render={this.renderBankField} />
            </Form>
          </div>
        </div>
      );
    }
    if (this.state.status === "succes") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
            <Form className="ui form">

             <Field name="succes" render={this.RenderSuccesPage}/>
            </Form>
          </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <Field name="submenu" render={this.renderProducts} />
        <div>
          <Field name="submenu" render={this.renderStatusBar} />

          <Form className="ui form">
            <Field name="confirm" render={this.renderConfirmationField} />
            {this.state.errors.length > 0 && (
              <p style={{ textAlign: "center", marginTop: 15, color: "red" }}>
                {(this.state.errors[0] as IApiError).message}
              </p>
            )}
          </Form>
        </div>
      </div>
    );
  };

  private RenderSuccesPage = ()=>{
   
     if(this.state.time === true)
     {
      return ( <div style={{margin: 400}}>
     <p>your order is in progress</p>
      <Loader active >Loading</Loader>
      </div>)}
     return(
       <div style={{margin: 400}}>
         your order is send!!!
       </div>
      )
  }

  private RenderOrderField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <div style={{ marginLeft: "1.5%", width: "150%" }}>
        <h3>These are your order details </h3>

        <h5>your emailaddress: {fieldProps.form.values.email}</h5>
        <Button
          primary
          floated="right"
          onClick={() => this.setStatus("option")}
        >
          Back
        </Button>
        <Button
          primary
          floated="right"
          onClick={() => this.setStatus("bank")}
          disabled={fieldProps.field.value === null}
        >
          Next
        </Button>
      </div>
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

            <Table.Cell>
              <select
                value={String(fieldProps.field.value)}
                onChange={ev =>
                  fieldProps.form.setFieldValue(
                    fieldProps.field.name,
                    Number(ev.target.value)
                  )
                }
              >
                <option value={String(null)} disabled>
                  Choose your bank
                </option>
                {bankOptions.map((bank, i) => (
                  <option key={i} value={String(i)}>
                    {bank}
                  </option>
                ))}
              </select>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Account number: </Table.Cell>
            <Table.Cell>
              <Input
                id="bankNumber"
                iconPosition="left"
                placeholder="IBAN"
                size="large"
              >
                <Icon name="btc" />
                <input {...fieldProps.field} />
              </Input>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Button
          primary
          floated="right"
          onClick={() => this.setStatus("confirm")}
          disabled={fieldProps.field.value === null}
        >
          Next
        </Button>
      </Form.Field>
    );
  };

  private renderConfirmationField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <Form.Field>
        <p>your email is: {fieldProps.form.values.email}</p>
        <p>your bank is: {bankOptions[fieldProps.form.values.bank!]}</p>
        <p>your bankNumber is : {fieldProps.form.values.bankNumber}</p>
        <Button
          primary
          onClick={() =>
            this.handleOrder(
              fieldProps.form.values.email,
              // HELPPPPPP
             [ fieldProps.form.initialValues.products.length]
            )
          }
        >
          Send
        </Button>
      </Form.Field>
    );
  };

  private renderEmailField = (fieldProps: FieldProps<IFormikValues>) => {
    const error = fieldProps.form.touched.email && fieldProps.form.errors.email;
    return (
      <Form.Field>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
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
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Divider />

        <Button
          onClick={() => this.setStatus("order")}
          floated="left"
          disabled={!fieldProps.form.isValid}
          primary
        >
          Continue with order
        </Button>

        {error && (
          <Label basic pointing="above" color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  };

  private renderOptionMenu = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <div style={{ marginTop: 100 }}>
        <Segment>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {" "}
            <div style={{ width: 240, marginRight: 50 }}>
              <h4>Existing customers</h4>
              <LoginPopupContent />
            </div>
            <div style={{ width: 240, marginLeft: 50 }}>
              <h4>Order without account?</h4>
              <h5>Enter your email</h5>
              <Field name="email" render={this.renderEmailField} />
            </div>
            <Divider vertical>OR</Divider>
          </div>
        </Segment>
      </div>
    );
  };

  private renderStatusBar = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <div style={styles.PaymentXShipping}>
        <Step.Group widths={3} size="mini">
          <Step
            active={this.state.status === "order"}
            onClick={() => this.setStatus("order")}
          >
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>Order</Step.Title>
            </Step.Content>
          </Step>
          <Step
            active={this.state.status === "bank"}
            disabled={this.state.status === "order"}
            onClick={() => this.setStatus("bank")}
          >
            <Icon name="credit card" />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
            </Step.Content>
          </Step>
          <Step
            active={this.state.status === "confirm"}
            disabled={this.state.status !== "confirm"}
          >
            <Icon name="info" />
            <Step.Content>
              <Step.Title>Confirm Order</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
      </div>
    );
  };
  private renderProducts = (fieldProps: FieldProps<IFormikValues>) => {
    return (
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
            {fieldProps.form.initialValues.products.map(
              (product: IProduct, i: number) => {
                if (product.album !== undefined) {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>Album: {product.album!.name}</Table.Cell>
                      <Table.Cell>Price: ${product.price}</Table.Cell>
                    </Table.Row>
                  );
                }
                return (
                  <Table.Row key={i}>
                    <Table.Cell>Track: {product.track!.title}</Table.Cell>
                    <Table.Cell>Price ${product.price}</Table.Cell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
      </div>
    );
  };
}

export default withApollo(Order);