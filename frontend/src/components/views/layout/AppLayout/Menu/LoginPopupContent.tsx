import * as React from 'react';
import {Button, Divider, Icon, Input, Form, Label} from "semantic-ui-react";
import {Field, FieldProps, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {withApollo, WithApolloClient} from "react-apollo";
import gql from "graphql-tag";
import IApiError from "../../../../../models/IApiError";
import IApiResult from "../../../../../models/IApiResult";
import IUser from "../../../../../models/IUser";
import {userState} from "../../../../../index";

interface IProps {
}

interface IState {
  errors: IApiError[];
}

interface IFormikValues {
  email: string;
  password: string;
}

const loginMutation = gql`
mutation ($data: LoginInput!) {
  login(data: $data) {
    data {
      email
      firstname
      lastname
      dateOfBirth
      token
      isAdmin
    }
    errors {
      message
    }
  }
}
`;

const initialValues: IFormikValues = {
  email: "",
  password: ""
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email should be a valid email."),
  password: Yup.string().required().min(5, 'Password should be at least 5 characters.')
});

type Props = WithApolloClient<IProps> & RouteComponentProps<{}>;

class LoginPopupContent extends React.Component<Props, IState> {
  public state = {
    errors: []
  };
  private redirectTo: string | null;

  constructor(props: Props) {
    super(props);

    const params = new URLSearchParams(props.location.search);
    this.redirectTo = params.get("redirectTo");
  }

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

  private handleSubmit = async (values: IFormikValues, formik: FormikProps<IFormikValues>) => {
    formik.setSubmitting(true);
    console.log("Login values are: ", values);
    const result = await this.props.client.mutate({
      mutation: loginMutation,
      variables: {
        data: {
          email: values.email,
          password: values.password
        }
      }
    });
    const apiResult = result.data!.login as IApiResult<IUser>;
    
    if (apiResult.errors) {
      this.setState({ errors: apiResult.errors });
    } else {
      if (this.state.errors.length > 0) {
        this.setState({ errors: [] });
      }
      await userState.login(apiResult.data!);
      if (this.redirectTo !== null) {
        this.props.history.push(this.redirectTo);
      }
    }
    formik.setSubmitting(false);
  };

  private renderFormik = (formik: FormikProps<IFormikValues>) => {
    return (
      <div>
        <Field
          name="email"
          render={this.renderEmailField}
        />
        <div style={{padding: 5}}/>
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
            onClick={formik.submitForm}
          >
            Login
          </Button>
          <Link to="/auth/register" style={{textAlign: 'center', marginTop: 15}}>
            Not a marshmallow yet?<br/>
            Sign me up!
          </Link>
          {this.state.errors.length > 0 &&
          <p style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>{(this.state.errors[0] as IApiError).message}</p>
          }
        </div>
      </div>
    );
  };

  private renderEmailField = (fieldProps: FieldProps<IFormikValues>) => {
    const error = fieldProps.form.touched.email && fieldProps.form.errors.email;

    return (
      <Form.Field>
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
        {error &&
        <Label basic pointing="above" color="red">{error}</Label>
        }
      </Form.Field>
    );
  };

  private renderPasswordField = (fieldProps: FieldProps<IFormikValues>) => {
    const error = fieldProps.form.touched.password && fieldProps.form.errors.password;

    return (
      <Form.Field>
        <Input
          id="password"
          size="large"
          type="password"
          placeholder="Password"
          iconPosition="left"
          error={Boolean(error)}
        >
          <Icon name="key"/>
          <input {...fieldProps.field} />
        </Input>
        {error &&
        <Label basic pointing="above" color="red">{error}</Label>
        }
      </Form.Field>
    );
  };
}

export default withRouter(withApollo(LoginPopupContent));
