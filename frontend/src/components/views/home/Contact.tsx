import * as React from "react";
import {Formik, FormikProps, Field, FieldProps} from "formik";
import * as Yup from "yup";
import AppLayout from "../layout/AppLayout/AppLayout";
import {
  Button,
  Input,
  Label,
  Header,
  Icon,
  TextArea, Form
} from "semantic-ui-react";

interface IFormikValues {
  name: string,
  email: string,
  message: string;
}

const initialValues: IFormikValues = {
  name: "",
  email: "",
  message: ""
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please fill in your name"),
  email: Yup.string()
    .required("Please fill in your email")
    .email("Email should be a valid email"),
  message: Yup.string().required("Please fill in your message")
});

class Contact extends React.Component {
  public render() {
    return (
      <AppLayout>
        <br/>
        <Header as="h2">
          <Icon name="mail"/>
          <Header.Content>
            Contact
            <Header.Subheader>
              You have any comments or complaints? Please let us know below.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}
          render={this.renderFormik}
        />
      </AppLayout>
    );
  }

  private renderFormik = (formik: FormikProps<IFormikValues>) => {
    return (
      <Form>
        <Field
          name="name"
          render={(fieldProps: FieldProps<IFormikValues>) => (
            <div style={{margin: 10}}>
              <Form.Field>
                <label>Name</label>
                <Input
                  fluid
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  icon="user"
                  iconPosition="left"
                  {...fieldProps.field}
                />
                {formik.errors.name && formik.touched.name && (
                  <Label basic pointing="above" color="red">
                    {formik.errors.name}
                  </Label>
                )}
              </Form.Field>
            </div>
          )}
        />

        <Field
          name="email"
          render={(fieldProps: FieldProps<IFormikValues>) => (
            <div style={{margin: 10}}>
              <Form.Field>
                <label>Email</label>
                <Input
                  fluid
                  id="email"
                  placeholder="johndoe@mail.com"
                  type="email"
                  icon="at"
                  iconPosition="left"
                  {...fieldProps.field}
                />
                {formik.errors.email && formik.touched.email && (
                  <Label basic pointing="above" color="red">
                    {formik.errors.email}
                  </Label>
                )}
              </Form.Field>
            </div>
          )}
        />

        <Field
          name="message"
          render={(fieldProps: FieldProps<IFormikValues>) => (
            <div style={{margin: 10}}>
              <Form.Field>
                <label>Message</label>
                <TextArea
                  id="message"
                  placeholder="Enter your message here"
                  autoHeight
                  style={{minHeight: 250, width: '100%'}}
                  {...fieldProps.field}
                />
                {formik.errors.message && formik.touched.message && (
                  <Label basic pointing="left" color="red">
                    {formik.errors.message}
                  </Label>
                )}
              </Form.Field>
            </div>
          )}
        />

        <Button
          disabled={!formik.isValid || formik.isSubmitting}
          onClick={formik.submitForm}
          style={{marginTop: 20, marginLeft: 25}}
          loading={formik.isSubmitting}
        >
          Send message
        </Button>
      </Form>
    );
  };

  private handleSubmit = async (values: IFormikValues, formik: FormikProps<IFormikValues>) => {
    formik.setSubmitting(true);

    setTimeout(() => {
      formik.resetForm();
      alert("Successfully send message");

      formik.setSubmitting(false);
    }, 1000);
  };
}

export default Contact;
