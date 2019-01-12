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
import IAlbum from "src/models/IAlbum";

interface IFormikValues {
  albumname: string;
  label: string;
  popularity: number;
  albumtype: number;
}

interface IProps {
}

const ADD_ALBUM_MUTATION = gql`
mutation x($data: AddAlbumDataInput!) {
  addAlbum(data: $data) {
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
  albumname: '',
  label: '',
  popularity: '' as any,
  albumtype: -1,
};

const validationSchema = Yup.object().shape({
  albumname: Yup.string().required(),
  label: Yup.string().min(1).required(),
  popularity: Yup.number().min(0).max(100).required(),
  albumtype: Yup.number().min(0).required(),
});

const albumTypes = [
  "single",
  "album",
  "compilation"
];

const AddAlbum: React.FunctionComponent<IProps & WithApolloClient<{}> & RouteComponentProps<{}>> = (props) => {
  const handleFormikSubmit = useRef(async (values: IFormikValues, formikProps: FormikProps<IFormikValues>) => {
    formikProps.setSubmitting(true);

    const user = userState.state.user! as IUser;

    try {
      const result = await props.client.mutate<any>({
        mutation: ADD_ALBUM_MUTATION,
        variables: {
          "data": {
            "authToken": user.token,
            "name": values.albumname,
            "label": values.label,
            "popularity": values.popularity,
            "albumType": albumTypes[values.albumtype],
          }
        }
      });

      const apiResult = result.data!.addAlbum as IApiResult<IAlbum>;
      if (apiResult.errors) {
        apiResult.errors.map(x => "Error: " + x.message).forEach(alert);
        return;
      }
    } catch {
      alert("Something went wrong trying to create this album");
      return;
    } finally {
      formikProps.setSubmitting(false);
    }

    props.history.push("/admin/albums");
  }).current;

  const renderFormik = useRef((formikProps: FormikProps<IFormikValues>) => {
    return (
      <>
        <Field
          name="albumname"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.albumname && formikProps.errors.albumname);
            return (
              <>
                <Form.Field required error={error}>
                  <label>Name</label>
                  <input
                    {...fieldProps.field}
                    placeholder="Album name"
                    required
                  />
                </Form.Field>
              </>
            )
          }}
        />
        <Field
          name="label"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.label && formikProps.errors.label);
            return (
              <Form.Field required error={error}>
                <label>Label</label>
                <input {...fieldProps.field} placeholder="Album label" required/>
              </Form.Field>
            )
          }}
        />
        <Field
          name="popularity"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.popularity && formikProps.errors.popularity);
            return (
              <Form.Field required error={error}>
                <label>Popularity</label>
                <input
                  {...fieldProps.field}
                  placeholder="0-100"
                  type="number"
                  required
                  onChange={ev => {
                    if (ev.target.value.trim() === "") {
                      fieldProps.form.setFieldValue(fieldProps.field.name, ev.target.value.trim());
                      return;
                    }

                    let value = Number(ev.target.value);
                    if (value < 0) {
                      value = 0;
                    } else if (value > 100) {
                      value = 100;
                    }
                    fieldProps.form.setFieldValue(fieldProps.field.name, value);
                  }}
                />
              </Form.Field>
            )
          }}
        />
        <Field
          name="albumtype"
          render={(fieldProps: FieldProps<IFormikValues>) => {
            const error = Boolean(formikProps.touched.albumtype && formikProps.errors.albumtype);
            return (
              <Form.Field required error={error}>
                <label>Album type</label>
                <select {...fieldProps.field} required>
                  <option value={-1} disabled>Make a selection...</option>
                  {albumTypes.map((albumType, i) => (
                    <option value={i}>{albumType}</option>
                  ))}
                </select>
                {/*<input {...fieldProps.field} placeholder="Single/album/compilation" required/>*/}
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
          <h1>Add a new album</h1>
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

export default withRouter(withApollo(AddAlbum));
