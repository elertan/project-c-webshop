import * as React from "react";
import {Button, Form} from "semantic-ui-react";
import {Field, FieldProps, Formik, FormikProps} from "formik";
import {useCallback, useRef} from "react";
import * as Yup from "yup";
import {withApollo, WithApolloClient} from "react-apollo";
import gql from "graphql-tag";
import {RouteComponentProps, withRouter} from "react-router";
import IUser from "../../../../../models/IUser";
import {userState} from "../../../../../index";
import IApiResult from "../../../../../models/IApiResult";
import AdminMenu from "../../../reusable/Admin/AdminMenu";

interface IFormikValues {
  trackId?: number;
  albumId?: number;
}

interface IProps {
}

const ADD_USER_MUTATION = gql`
mutation x($data: AddAlbumXTrackDataInput!) {
  addAlbumXTrack(data: $data) {
    data {
      albumId
      trackId
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
  trackId: undefined,
  albumId: undefined
};

const validationSchema = Yup.object().shape({
  trackId: Yup.number().required(),
  albumId: Yup.number().required(),
});

const AddAlbumXTrack: React.FunctionComponent<IProps & WithApolloClient<{}> & RouteComponentProps<{}>> = (props) => {
  const handleFormikSubmit = useCallback(async (values: IFormikValues, formikProps: FormikProps<IFormikValues>) => {
    formikProps.setSubmitting(true);

    const user = userState.state.user! as IUser;

    try {
      const result = await props.client.mutate<any>({
        mutation: ADD_USER_MUTATION,
        variables: {
          "data": {
            "authToken": user.token,
            albumId: values.albumId,
            trackId: values.trackId
          }
        }
      });

      const apiResult = result.data!.addAlbumXTrack as IApiResult<IUser>;
      if (apiResult.errors) {
        apiResult.errors.map(x => "Error: " + x.message).forEach(alert);
        return;
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong trying to create this relationship");
      return;
    } finally {
      formikProps.setSubmitting(false);
    }

    props.history.push("/admin/albumxtrack");
  }, []);

  const renderFormik = useRef((formikProps: FormikProps<IFormikValues>) => {
    return (
      <>
        <Field
          name="trackId"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.trackId && formikProps.errors.trackId);
            return (
              <>
                <Form.Field required error={error}>
                  <label>Track Id</label>
                  <input
                    {...fieldProps.field}
                    placeholder="Track Id"
                    type="number"
                    required
                  />
                </Form.Field>
              </>
            )
          }}
        />
        <Field
          name="albumId"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.albumId && formikProps.errors.albumId);
            return (
              <>
                <Form.Field required error={error}>
                  <label>Album Id</label>
                  <input
                    {...fieldProps.field}
                    placeholder="Album Id"
                    type="number"
                    required
                  />
                </Form.Field>
              </>
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
          <h1>Add a new album x track relationship</h1>
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

export default withRouter(withApollo(AddAlbumXTrack));

