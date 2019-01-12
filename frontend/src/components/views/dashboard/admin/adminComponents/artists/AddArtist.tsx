import * as React from "react";
import gql from "graphql-tag";
import {withApollo, WithApolloClient} from "react-apollo";
import {Field, FieldProps, Formik, FormikProps} from "formik";
import {useRef} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import {userState} from "../../../../../../index";
import IApiResult from "../../../../../../models/IApiResult";
import IUser from "../../../../../../models/IUser";
import {Button, Form} from "semantic-ui-react";
import * as Yup from "yup";

interface IFormikValues {
  ArtistName: string;
  ID: string;
}

interface IProps {}

const ADD_ARTIST_MUTATION = gql`
  mutation a($data: AddArtistDataInput!) {
    addArtist(data: $data) {
      data {
        name
        spotifyId
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
  ArtistName: "",
  ID: ""
};

const validationSchema = Yup.object().shape({
  ArtistName: Yup.string()
    .min(1)
    .required(),
  ID: Yup.string()
    .min(1)
    .required()
});

const AddArtist: React.FunctionComponent<
  IProps & WithApolloClient<{}> & RouteComponentProps<{}>
> = props => {
  const handleFormikSubmit = useRef(
    async (values: IFormikValues, formikProps: FormikProps<IFormikValues>) => {
      formikProps.setSubmitting(true);

      const user = userState.state.user! as IUser;

      try {
        const result = await props.client.mutate<any>({
          mutation: ADD_ARTIST_MUTATION,
          variables: {
            data: {
              authToken: user.token,
              name: values.ArtistName,
              spotifyId: values.ID
            }
          }
        });

        const apiResult = result.data!.addArtist as IApiResult<IUser>;
        if (apiResult.errors) {
          apiResult.errors.map(x => "Error: " + x.message).forEach(alert);
          return;
        }
      } catch {
        alert("Something went wrong trying to create this artist");
        return;
      } finally {
        formikProps.setSubmitting(false);
      }

      props.history.push("/admin/artists");
    }
  ).current;

  const renderFormik = useRef((formikProps: FormikProps<IFormikValues>) => {
    return (
      <>
        <Field
          name="ArtistName"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(
              formikProps.touched.ArtistName && formikProps.errors.ArtistName
            );
            return (
              <Form.Field required error={error}>
                <label>Aritst Name</label>
                <input
                  {...fieldProps.field}
                  placeholder="Artist Name"
                  required
                />
              </Form.Field>
            );
          }}
        />
        <Field
          name="ID"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.ID && formikProps.errors.ID);
            return (
              <Form.Field required error={error}>
                <label>Artist ID</label>
                <input {...fieldProps.field} placeholder="Artist ID" required />
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
      <AdminMenu />
      <div style={styles.root}>
        <Form>
          <h1>Add new artist</h1>
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

export default withRouter(withApollo(AddArtist));
