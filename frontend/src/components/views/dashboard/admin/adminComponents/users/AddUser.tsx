import * as React from "react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import {Button, Form} from "semantic-ui-react";
import {Field, FieldProps, Formik, FormikProps} from "formik";
import {useRef} from "react";
import * as Yup from "yup";
import {withApollo, WithApolloClient} from "react-apollo";
import gql from "graphql-tag";
import {userState} from "../../../../../../index";
import IUser from "../../../../../../models/IUser";
import IApiResult from "../../../../../../models/IApiResult";
import {RouteComponentProps, withRouter} from "react-router";

interface IFormikValues {
  email: string;
  password: string;
  token: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
}

interface IProps {
}

const ADD_USER_MUTATION = gql`
mutation x($data: AddUserDataInput!) {
  addUser(data: $data) {
    data {
      id
    }
    errors {
      message
    }
  }
}
`;

const styles = {
  root: {
    padding: 100
  } as React.CSSProperties
};

const initialFormikValues: IFormikValues = {
  email: '',
  password: '',
  token: '',
  firstname: '',
  lastname: '',
  dateOfBirth: new Date().toISOString().substring(0, 10) // https://stackoverflow.com/a/28431880/4416341
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(1).required(),
  token: Yup.string().min(1).required(),
  firstname: Yup.string().min(1).required(),
  lastname: Yup.string().min(1).required()
});

const AddUser: React.FunctionComponent<IProps & WithApolloClient<{}> & RouteComponentProps<{}>> = (props) => {
  const handleFormikSubmit = useRef(async (values: IFormikValues, formikProps: FormikProps<IFormikValues>) => {
    formikProps.setSubmitting(true);

    const user = userState.state.user! as IUser;

    try {
      const result = await props.client.mutate<any>({
        mutation: ADD_USER_MUTATION,
        variables: {
          "data": {
            "authToken": user.token,
            "email": values.email,
            "password": values.password,
            "token": values.token,
            "firstname": values.firstname,
            "lastname": values.lastname,
            "dateOfBirth": values.dateOfBirth
          }
        }
      });

      const apiResult = result.data!.addUser as IApiResult<IUser>;
      if (apiResult.errors) {
        apiResult.errors.map(x => "Error: " + x.message).forEach(alert);
        return;
      }
    } catch {
      alert("Something went wrong trying to create this user");
      return;
    } finally {
      formikProps.setSubmitting(false);
    }

    props.history.push("/admin/users");
  }).current;

  const renderFormik = useRef((formikProps: FormikProps<IFormikValues>) => {
    return (
      <>
        <Field
          name="email"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.email && formikProps.errors.email);
            return (
              <>
                <Form.Field required error={error}>
                  <label>Email</label>
                  <input
                    {...fieldProps.field}
                    placeholder="Email"
                    type="email"
                    required
                  />
                </Form.Field>
              </>
            )
          }}
        />
        <Field
          name="password"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.password && formikProps.errors.password);
            return (
              <Form.Field required error={error}>
                <label>Password</label>
                <input {...fieldProps.field} placeholder="Password" required/>
              </Form.Field>
            )
          }}
        />
        <Field
          name="token"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.token && formikProps.errors.token);
            return (
              <Form.Field required error={error}>
                <label>Token</label>
                <input {...fieldProps.field} placeholder="Token" required/>
              </Form.Field>
            )
          }}
        />
        <Field
          name="firstname"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.firstname && formikProps.errors.firstname);
            return (
              <Form.Field required error={error}>
                <label>First Name</label>
                <input {...fieldProps.field} placeholder="First Name" required/>
              </Form.Field>
            )
          }}
        />
        <Field
          name="lastname"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.lastname && formikProps.errors.lastname);
            return (
              <Form.Field required error={error}>
                <label>Last Name</label>
                <input {...fieldProps.field} placeholder="Last Name" required/>
              </Form.Field>
            )
          }}
        />
        <Field
          name="dateOfBirth"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.dateOfBirth && formikProps.errors.dateOfBirth);
            return (
              <Form.Field required error={error}>
                <label>Date of Birth</label>
                <input {...fieldProps.field} placeholder="Date of Birth" type="date" required/>
              </Form.Field>
            )
          }}
        />
        <Button
          onClick={formikProps.submitForm}
          primary
          disabled={formikProps.isSubmitting || !formikProps.isValid}
          size="large"
        >Add</Button>
      </>
    )
  }).current;

  return (
    <div>
      <AdminMenu/>
      <div style={styles.root}>
        <Form>
          <h1>Add a new user</h1>
          <Formik
            initialValues={initialFormikValues}
            onSubmit={handleFormikSubmit}
            render={renderFormik}
            validationSchema={validationSchema}
          />
        </Form>
      </div>
    </div>
  );
};

export default withRouter(withApollo(AddUser));
