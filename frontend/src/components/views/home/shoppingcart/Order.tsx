import * as React from "react";
import * as Yup from "yup";
import AppLayout from "../../layout/AppLayout/AppLayout";
import {
  Table,
  Form,
  Icon,
  Step,
  Button,
  Divider,
  Input,
  Segment,
  Loader,
  Card
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
import { NavLink } from "react-router-dom";
import BedragWaarde, { Valuta } from "../../reusable/BedragWaarde";
import { userState } from "src";

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
const isEmailInDbQuery = gql`
  query isEmailInDb($email: String) {
    isEmailInDb(data: $email)
  }
`;

interface IProps {}

const styles = {
  OrderPositioning: {
    width: "35%",
    margin: "0.6%"
  },
  PaymentXShipping: {
    width: "150%",
    margin: "1.7%"
  }
};

interface IFormikValues {
  email: string,
  status: string,
  bank: number | null,
  bankNumber: string,
  products: IProduct[];
  iban: string;
}

const initialValues: IFormikValues = {
  email: "",
  status: "option",
  bank: null,
  bankNumber: "",
  products: [],
  iban: "",
};

const bankOptions = ["ING", "ABN Amro", "Rabobank"];

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is a required field")
    .email("Entered email address is not a valid address."),
});

class Order extends React.Component<WithApolloClient<IProps>> {
  public state = {
    errors: [],
    email: "",
    status: "option",
    value: "",
    radio: true,
    time: true,
    cartError: "",
    bankNumber: 0,
    process: false,
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

  private handleSubmit = async (values: IFormikValues, formik: FormikProps<IFormikValues>) => {
    console.log("IF PRESENT I GET CALLED")
    formik.setSubmitting(true);
    this.setState({ bankNumber: values.bankNumber })
    formik.setSubmitting(false);
  };

  private handleOrder = async ( boughtProducts: number[], newEmail: string) => {
    this.setState({process: true})

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
        this.setState({ errors: [] , process: false});
        
      } else {
        this.startTimeout();
        
        this.setStatus("succes");
      }
    }
  };

  private DoesUserExist = async (newEmail: string) => {
    console.log("Checking if user exists...");
    const result = await this.props.client.query({
      query: isEmailInDbQuery,
      variables: {
        email: newEmail
      }
    });
    const dataResult = "isEmailInDb";
    const apiResult = result.data[dataResult];
    if (apiResult === false) {
      this.setStatus("order");
    }else{
    this.setState({ errors: "This email address is already in use. Please login instead." });
    console.log(this.state.errors);}
  };

  private setStatus = (newStatus: string) => {
    this.setState({ 
      status: newStatus });
  };

  private startTimeout = () => {
    setTimeout(() => {
      this.setState({
         time: false });
      },
      5000
    );
  };

  private renderFormik = (formik: FormikProps<IFormikValues>) => {
    if (this.state.status === "option") {
      return (
        <Form className="ui form">
          <Field name="option" render={this.renderOptionMenu} />
          {this.state.errors.length > 0 && (
            <p style={{ textAlign: "center", marginTop: 15, color: "red" }}>
              {(this.state.errors[0] as IApiError).message}
            </p>
          )}
          {this.state.cartError.length > 3 && (
            <p style={{ textAlign: "center", marginTop: 15, color: "red" }}>
              {this.state.cartError}
            </p>
          )}
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
          <Field name="submenu" render={this.renderProducts}/>

          <div>
            <Field name="submenu" render={this.renderStatusBar}/>
            <Form className="ui form">
              <div style={{marginLeft: "1.5%", width: "150%"}}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <h3>Billing details</h3>
                    </Card.Header>
                    <Card.Description>
                      <Field name="bank" render={this.renderBankSelectField}/>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content>
                    <Card.Description>
                      <div style={{display: "flex", alignItems: "center"}}>
                        <span>IBAN:</span>
                        <div style={{ width: 10 }} />
                        <Field
                          name="iban"
                          render={this.renderIbanField}
                          max={18}
                        />
                      </div>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button
                      primary
                      floated="right"
                      onClick={() => this.setStatus("confirm")}
                      disabled={formik.values.bank === null || formik.values.iban === "" || formik.values.iban.length !== 18}
                    >
                      Next
                    </Button>
                  </Card.Content>
                </Card>
              </div>
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
            flexDirection: "row",
            justifyContent: "center",
            margin: "5%"
          }}
        >
          <Form className="ui form">
            <Field name="succes" render={this.RenderSuccesPage} />
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

  private RenderSuccesPage = (cartState: CartState) => {
    if (this.state.time === true) {
      return (
        <div>
          <div>
            <p>Your order is being processed...</p>
            <br /><br /><br /><br />< br />
          </div>
          <Loader active>Loading</Loader>
        </div>
      );
    }
    return (
      <div>
        Your order has been sent!{" "}Thank you for choosing Marshmallow. <br />
        Click on the link below to return to the main page. <br /><br />
        <NavLink to="/" onClick={() => cartState.setState({ products: [] })}>
          Home
        </NavLink>
      </div>
    );
  };

  private RenderOrderField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <div style={{ marginLeft: "1.5%", width: "150%" }}>
        <Card fluid>
          <Card.Content>
            <Card.Header>Personal order detail</Card.Header>
              <Card.Description>
                Your email address: {fieldProps.form.values.email}
              </Card.Description>
          </Card.Content>
          <Card.Content extra>
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
          </Card.Content>
        </Card>
      </div>
    );
  };

  private renderBankSelectField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <Card.Description>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>
            Bank:
          </span>
          <div style={{ width: 10 }} />
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
        </div>
      </Card.Description>
    );
  };

  private renderIbanField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <Input
        id="bankNumber"
        iconPosition="left"
        placeholder="NL12 XXXX 1234 5678 90"
        size="large"
      >
        <Icon name="credit card"/>
        <input {...fieldProps.field} />
      </Input>
    );
  };

  private renderConfirmationField = (fieldProps: FieldProps<IFormikValues>) => {
    const user = userState.state.user! as IUser;
    return (
      <div style={{marginLeft: "1.5%", width: "150%"}}>
        <Card fluid>
          <Card.Content>
            <p><b>Email address</b>: {fieldProps.form.values.email}</p>
          </Card.Content>
          <Card.Content>
            <p><b>Bank vendor</b>: {bankOptions[fieldProps.form.values.bank!]}</p>
          </Card.Content>
          <Card.Content>
            <p><b>IBAN</b>: {fieldProps.form.values.iban}</p>
          </Card.Content>
          <Card.Content extra>
            <Button
              primary
              floated="right"
              onClick={() =>
                this.handleOrder(
                  fieldProps.form.initialValues.products.map(x => x.id),
                  user!.token!
                )
              }
              disabled={this.state.process}
            >
              Purchase
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  };

  private renderEmailField = (fieldProps: FieldProps<IFormikValues>) => {
    const error = fieldProps.form.touched.email && fieldProps.form.errors.email;
    return (
      <Form.Field >
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
          onClick={() => this.DoesUserExist(fieldProps.form.values.email)}
          floated="left"
          disabled={!fieldProps.form.isValid}
          primary
        >
          Continue with order
        </Button>

        <p style={{color:"red", width:"80%"}}>{this.state.errors}</p>
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
        <Step.Group widths={3} size="small" fluid>
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
                      <Table.Cell>Price:  <BedragWaarde
                    bedrag={product.price}
                    valuta={Valuta.Dollar}
                    geenTeken
                    toonMutatie={false}
                  /></Table.Cell>
                    </Table.Row>
                  );
                }
                return (
                  <Table.Row key={i}>
                    <Table.Cell>Track: {product.track!.title}</Table.Cell>
                    <Table.Cell>Price  <BedragWaarde
                    bedrag={product.price}
                    valuta={Valuta.Dollar}
                    geenTeken
                    toonMutatie={false}
                  /></Table.Cell>
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
