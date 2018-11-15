import * as React from 'react';
import {Button, Divider, Input} from "semantic-ui-react";
import {Field, FieldProps, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
import {Link} from "react-router-dom";

interface IProps {}
interface IState {}

interface IFormikValues {
  email: string;
  password: string;
}

const initialValues: IFormikValues = {
  email: "",
  password: ""
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email should be a valid email."),
  password: Yup.string().min(5, 'Password should be at least 5 characters.')
});

class LoginPopupContent extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
        render={this.renderFormik}
      />
    );
  }

  private handleSubmit = (values: IFormikValues) => {
    alert('Submit');
  };

  private renderFormik = (formik: FormikProps<IFormikValues>) => {
    return (
      <div style={{ width: 250 }}>
        <h4>E-mail</h4>
        <Field
          name="email"
          render={this.renderEmailField}
        />
        <Divider/>
        <h4>Password</h4>
        <Field
          name="password"
          render={this.renderPasswordField}
        />
        <Divider/>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Button
            primary
            disabled={!formik.isValid || formik.isSubmitting || formik.isValidating}
          >
            Login
          </Button>
          <Link to="/auth/register" style={{ textAlign: 'center', marginTop: 15 }}>
            Not a marshmallow yet?<br />
            Sign me up!
          </Link>
        </div>
      </div>
    );
  };

  private renderEmailField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <Input
        {...fieldProps.field}
        id="email"
        transparent
        inline
        size="large"
        placeholder="johndoe@example.com"
      />
    );
  };

  private renderPasswordField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <Input
        {...fieldProps.field}
        id="password"
        transparent
        inline
        size="large"
        type="password"
        placeholder="Password"
      />
    );
  };
}

export default LoginPopupContent;
