import * as React from "react";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import AppLayout from "../layout/AppLayout/AppLayout";
import {
  Button,
  Input,
  Label,
  Header,
  Icon,
  TextArea
} from "semantic-ui-react";

interface IFormikValues {
  name: string,
  email: string,
  message: string;
}

class Contact extends React.Component {
  public render() {
    return (
      <AppLayout>
        <br />
        <Header as="h2">
          <Icon name="mail" />
          <Header.Content>
            Contact
            <Header.Subheader>
              You have any comments or complaints? Please let us know below.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Formik
          initialValues={{
            name: "",
            email: "",
            message: ""
          }}
          onSubmit={async (values: IFormikValues, formik: FormikProps<IFormikValues>) => {
            console.log(values);
            formik.setSubmitting(true);
            
            // ... Email client



          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Please fill in your name"),
            email: Yup.string()
              .required("Please fill in your email")
              .email("Email should be a valid email"),
            message: Yup.string().required("Please fill in your message")
          })}
        >
          {props => {
            const { isSubmitting, errors, touched, handleChange } = props;
            return (
              <Form>
                <br />
                <Input
                  onChange={handleChange}
                  fluid
                  id="name"
                  placeholder="Your name"
                  type="text"
                />
                {errors.name && touched.name && (
                  <Label basic pointing="above" color="red">
                    {errors.name}
                  </Label>
                )}
                <br />

                <Input
                  onChange={handleChange}
                  fluid
                  id="email"
                  placeholder="Your email"
                  type="text"
                />
                {errors.email && touched.email && (
                  <Label basic pointing="above" color="red">
                    {errors.email}
                  </Label>
                )}
                <br />
                <TextArea
                  onChange={handleChange}
                  id="message"
                  placeholder="Tell us more"
                />
                {errors.message && touched.message && (
                  <Label basic pointing="left" color="red">
                    {errors.message}
                  </Label>
                )}
                <br />
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </AppLayout>
    );
  }
}

export default Contact;
