import * as React from "react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import {Button, Form, Message} from "semantic-ui-react";
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

interface IProps {}

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
    padding: 50
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
  password: Yup.string().min(5).required(),
  token: Yup.string().min(5).required(),
  firstname: Yup.string().required(),
  lastname: Yup.string().required()
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

  const renderFormik = useRef((formikProps: FormikProps<IFormikValues>) => (
    <>
      <Field
        name="email"
        render={(fieldProps: FieldProps<IFormikValues>) => {
          const error = fieldProps.form.touched.email && fieldProps.form.errors.email;

          return (
            <Form.Field required error={Boolean(error)}>
              <label>Email</label>
              <input
                {...fieldProps.field}
                placeholder="Email"
                type="email"
                required
              />
              {error &&
              <Message error content={error}/>
              }
            </Form.Field>
          )
        }}
      />
      <Form.Field required>
        <label>Password</label>
        <Field
          name="password"
          render={(fieldProps: FieldProps<IFormikValues>) => (
            <input {...fieldProps.field} placeholder="Password" required/>
          )}
        />
      </Form.Field>
      <Form.Field required>
        <label>Token</label>
        <Field
          name="token"
          render={(fieldProps: FieldProps<IFormikValues>) => (
            <input {...fieldProps.field} placeholder="Token" required/>
          )}
        />
      </Form.Field>
      <Form.Field required>
        <label>First Name</label>
        <Field
          name="firstname"
          render={(fieldProps: FieldProps<IFormikValues>) => (
            <input {...fieldProps.field} placeholder="First Name" required/>
          )}
        />
      </Form.Field>
      <Form.Field required>
        <label>Last Name</label>
        <Field
          name="lastname"
          render={(fieldProps: FieldProps<IFormikValues>) => (
            <input {...fieldProps.field} placeholder="Last Name" required/>
          )}
        />
      </Form.Field>
      <Form.Field required>
        <label>Date of Birth</label>
        <Field
          name="dateOfBirth"
          render={(fieldProps: FieldProps<IFormikValues>) => (
            <input {...fieldProps.field} placeholder="Date of Birth" type="date" required/>
          )}
        />
      </Form.Field>
      <Button
        onClick={formikProps.submitForm}
        primary
        disabled={formikProps.isSubmitting || !formikProps.isValid}
      >Add</Button>
      <code>{JSON.stringify(formikProps.values)}</code>
    </>
  )).current;

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
