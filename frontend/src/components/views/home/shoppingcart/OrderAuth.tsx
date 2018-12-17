import * as React from "react";
import LoginPopupContent from "../../layout/AppLayout/Menu/LoginPopupContent";
import AppLayout from "../../layout/AppLayout/AppLayout";
import { FieldProps, Formik, FormikProps, Field } from "formik";
import { Table, Input, Form, Icon, Button, Label } from "semantic-ui-react";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

interface IFormikValues {
  email: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Entered email is not a valid email")
});

const initialValues: IFormikValues = {
  email: ""
};
class OrderAuth extends React.Component {
  public state = {};

  public render() {
    return (
      <AppLayout>
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          {" "}
          <div
            style={{ width: 240, height: 280, borderRight: "1px solid black" }}
          >
            <div>
              Login
              <LoginPopupContent />
            </div>
          </div>
          <Formik
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
            render={this.renderFormik}
            validationSchema={validationSchema}
          />
        </div>
      </AppLayout>
    );
  }

  private handleSubmit = async (
    values: IFormikValues,
    formik: FormikProps<IFormikValues>
  ) => {
    console.log("Handling submit");
    formik.setSubmitting(true);
    console.log("values: ", values);
    console.log("Result is: ");
  };

  private renderEmailField = (fieldProps: FieldProps<IFormikValues>) => {
    const error = fieldProps.form.touched.email && fieldProps.form.errors.email;
    return (
      <Form.Field>
        <Table.HeaderCell colSpan="2">
          <h3>Buy without account?</h3>
        </Table.HeaderCell>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Emailaddress</Table.Cell>
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
        <NavLink to={"/shoppingcart/order"}>
          <Button floated="right" disabled={!fieldProps.form.isValid} positive>
            Next
          </Button>
        </NavLink>
        {error && (
          <Label basic pointing="above" color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    );
  };

  private renderFormik = (formik: FormikProps<IFormikValues>) => {
    return (
      <Form className="ui form">
        <Field name="email" render={this.renderEmailField} />
      </Form>
    );
  };
}

export default OrderAuth;
