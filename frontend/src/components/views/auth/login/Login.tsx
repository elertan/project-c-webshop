import {Button, Card, CardActions, CardContent, Checkbox, TextField, Typography} from "@material-ui/core";
import {Field, FieldProps, Formik, FormikProps} from "formik";
import * as React from 'react';
import * as Yup from 'yup';
import './Login.css';

interface IProps {}
interface IFormikValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialValues = {} as IFormikValues;
const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is a required field").email("Entered email is not a valid email"),
  password: Yup.string().required("Password is a required field")
});

class Login extends React.Component<IProps> {

  public render() {
    return (
      <div className="Login-container">
        <div className="Login-background"/>
        <div className="Login-content">
          <Card className="Login-card">
            <Formik
              onSubmit={this.handleSubmit}
              initialValues={initialValues}
              render={this.renderFormik}
              validationSchema={validationSchema}
            />
          </Card>
        </div>
      </div>
    );
  }

  private handleSubmit = (values: IFormikValues) => {
    alert(JSON.stringify(values));
  };

  private renderFormik = (fprops: FormikProps<IFormikValues>) => (
    <>
      <CardContent className="Login-card-content">
        <Typography
          className="Login-card-title"
          variant="title"
        >Login</Typography>
        <Field
          name="email"
          render={this.renderEmailField}
        />
        <Field
          name="password"
          render={this.renderPasswordField}
        />
        <div className="Login-card-rememberme">
          <Field
            name="rememberMe"
            render={this.renderRememberMeField}
          />
          <Typography>Remember me</Typography>
        </div>
      </CardContent>
      <CardActions className="Login-card-actions">
        <Button
          color="primary"
          disabled={!fprops.isValid || fprops.isSubmitting}
          onClick={fprops.submitForm}
        >Login</Button>
      </CardActions>
    </>
  );

  private renderEmailField = (p: FieldProps<IFormikValues>) => (
    <TextField
      {...p.field}
      placeholder="Email"
      type="email"
      fullWidth
      error={p.form.touched.email && Boolean(p.form.errors.email)}
      helperText={p.form.touched.email && p.form.errors.email}
    />
  );

  private renderPasswordField = (p: FieldProps<IFormikValues>) => (
    <TextField
      {...p.field}
      placeholder="Password"
      type="password"
      fullWidth
      error={p.form.touched.password && Boolean(p.form.errors.password)}
      helperText={p.form.touched.password && p.form.errors.password}
    />
  );

  private renderRememberMeField = (p: FieldProps<IFormikValues>) => {
    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => p.form.setFieldValue("rememberMe", ev.target.checked);
    return (
      <Checkbox
        checked={p.field.value}
        onChange={onChange}
      />
    );
  };

}

export default Login;
