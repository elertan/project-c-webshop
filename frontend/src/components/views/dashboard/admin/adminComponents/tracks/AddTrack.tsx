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
import ITrack from "src/models/ITrack";

interface IFormikValues {
  name: string,
  durationms: number,
  explicit: boolean,
  previewurl: string,
}

interface IProps {
}

const ADD_TRACK_MUTATION = gql`
  mutation x($data: AddTrackDataInput!) {
    addTrack(data: $data) {
      data {
        name
        durationMs
        explicit
        previewUrl
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
  name: "",
  durationms: 0,
  explicit: false,
  previewurl: ""
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).required(),
  durationms: Yup.number().required(),
  explicit: Yup.boolean(),
  previewurl: Yup.string()
});

const AddTrack: React.FunctionComponent<IProps & WithApolloClient<{}> & RouteComponentProps<{}>> = props => {
  const handleFormikSubmit = useRef(
    async (values: IFormikValues, formikProps: FormikProps<IFormikValues>) => {
      formikProps.setSubmitting(true);

      const user = userState.state.user! as IUser;

      try {
        const result = await props.client.mutate<any>({
          mutation: ADD_TRACK_MUTATION,
          variables: {
            data: {
              authToken: user.token,
              name: values.name,
              durationMs: values.durationms,
              explicit: values.explicit,
              previewUrl: values.previewurl
            }
          }
        });

        const apiResult = result.data!.addTrack as IApiResult<ITrack>;
        if (apiResult.errors) {
          apiResult.errors.map(x => "Error: " + x.message).forEach(alert);
          return;
        }
      } catch {
        alert("Something went wrong trying to create this track");
        return;
      } finally {
        formikProps.setSubmitting(false);
      }

      props.history.push("/admin/tracks");
    }
  ).current;

  const renderFormik = useRef((formikProps: FormikProps<IFormikValues>) => {
    return (
      <>
        <Field
          name="name"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(
              formikProps.touched.name && formikProps.errors.name
            );
            return (
              <Form.Field required error={error}>
                <label>Track name</label>
                <input
                  {...fieldProps.field}
                  placeholder="Name of the track"
                  required
                />
              </Form.Field>
            );
          }}
        />
        <Field
          name="durationms"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(
              formikProps.touched.durationms && formikProps.errors.durationms
            );
            return (
              <Form.Field required error={error}>
                <label>Duration (in milliseconds)</label>
                <input {...fieldProps.field} placeholder="30000" required type="number"/>
              </Form.Field>
            );
          }}
        />
        <Field
          name="explicit"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(
              formikProps.touched.explicit && formikProps.errors.explicit
            );
            return (
              <Form.Field error={error}>
                <label>Explicit</label>
                <input {...fieldProps.field} required type="checkbox"/>
              </Form.Field>
            );
          }}
        />
        <Field
          name="previewurl"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(
              formikProps.touched.previewurl && formikProps.errors.previewurl
            );
            return (
              <Form.Field error={error}>
                <label>Music Preview URL</label>
                <input {...fieldProps.field} placeholder="https://mylink.com/test.mp3" required/>
              </Form.Field>
            );
          }}
        />
        <Button
          onClick={formikProps.submitForm}
          primary
          disabled={formikProps.isSubmitting || !formikProps.isValid}
          size="large"
        >
          Add
        </Button>
      </>
    );
  }).current;

  return (
    <div>
      <AdminMenu/>
      <div style={styles.root}>
        <Form>
          <h1>Add new track</h1>
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

export default withRouter(withApollo(AddTrack));
