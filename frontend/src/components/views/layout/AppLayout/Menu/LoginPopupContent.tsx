import * as React from 'react';
import {Button, Divider, Icon, Input} from "semantic-ui-react";
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
      <div>
        <Field
          name="email"
          render={this.renderEmailField}
        />
        <div style={{ padding: 5 }} />
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
        id="email"
        iconPosition="left"
        placeholder="johndoe@example.com"
        size="large"
        error={Boolean(fieldProps.form.errors.email)}
      >
        <Icon name="at" />
        <input {...fieldProps.field} />
      </Input>
    );
  };

  private renderPasswordField = (fieldProps: FieldProps<IFormikValues>) => {
    return (
      <Input
        id="password"
        size="large"
        type="password"
        placeholder="Password"
        iconPosition="left"
        error={Boolean(fieldProps.form.errors.password)}
      >
        <Icon name="key" />
        <input {...fieldProps.field} />
      </Input>
    );
  };
}

export default LoginPopupContent;
