import * as React from "react";
import * as Yup from 'yup';
import { Button, Icon, Input, Form, Label } from "semantic-ui-react";
// Divider
import { Field, FieldProps, Formik, FormikProps } from "formik";
import AppLayout from "../../layout/AppLayout/AppLayout";
// import { Link } from "react-router-dom";
// import './LoginDetail.css';

interface IFormikValues {
    firstName: string,
    lastName: string,
    infix: string,
    email: string;
    password: string;
}

const initialValues = {} as IFormikValues;
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("A first name is required"),
    lastName: Yup.string().required("A last name is required"),
    infix: Yup.string().notRequired(),
    email: Yup.string().required("Email is a required field").email("Entered email is not a valid email"),
    password: Yup.string().required("Password is a required field").min(5, "Password should be at least 5 characters."),
});



class RegisterDetail extends React.Component {
    public render() {
        return (
            <AppLayout>
                <Formik
                    onSubmit={this.handleSubmit}
                    initialValues={initialValues}
                    render={this.renderFormik}
                    validationSchema={validationSchema}
                />
            </AppLayout>
        )
    }


    private handleSubmit = (values: IFormikValues) => {
        alert(JSON.stringify(values));
    };

    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <div style={ {marginTop: "50px"} }>
                <Form className="ui form">
                    <h2 className="ui dividing header">Welcome to Marshmallow</h2>
                    <Field
                        name="firstName"
                        render={this.renderFirstNameField}
                    />
                    <div style={{ padding: 5 }} />
                    <Field
                        name="infix"
                        render={this.renderInfixField}
                    />
                    <div style={{ padding: 5 }} />
                    <Field
                        name="lastName"
                        render={this.renderLastNameField}
                    />
                    <div style= { {marginBottom: "15px", marginTop: "40px"} }>
                        <h3 className="ui dividing header">Login details</h3>
                        <p>The email address and password are needed for you to log in to your account.
                        This address will also be used to notify you of orders and their status.</p>
                    </div>
                    <Field
                        name="email"
                        render={this.renderEmailField}
                    />
                    <div style={{ padding: 5 }} />
                    <Field
                        name="password"
                        render={this.renderPasswordField}
                    />
                    <Button
                        primary
                        disabled={!formik.isValid || formik.isSubmitting || formik.isValidating}
                        onClick={formik.submitForm}
                    >
                        Register
                    </Button>
                    {/* {this.state.errors.length > 0 &&
                        <p style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>{(this.state.errors[0] as IApiError).message}</p>
                    } */}
                </Form>
            </div>
        )
    }

    private renderFirstNameField = (fieldProps: FieldProps<IFormikValues>) => {
        const error = fieldProps.form.touched.firstName && fieldProps.form.errors.firstName;

        return (

            <Form.Field>
                <label>First name *</label>
                <Input
                    id="firstName"
                    iconPosition="left"
                    placeholder="John"
                    size="large"
                    error={Boolean(error)}
                >
                    <input {...fieldProps.field} />
                </Input>
                {error &&
                    <Label basic pointing="above" color="red">{error}</Label>
                }
            </Form.Field>
        );
    };

    private renderInfixField = (fieldProps: FieldProps<IFormikValues>) => {

        return (
            <Form.Field>
                <label>Infix</label>
                <Input
                    id="lastName"
                    iconPosition="left"
                    size="large"
                >
                    <input {...fieldProps.field} />
                </Input>
            </Form.Field>
        );
    };

    private renderLastNameField = (fieldProps: FieldProps<IFormikValues>) => {
        const error = fieldProps.form.touched.lastName && fieldProps.form.errors.lastName;

        return (
            <Form.Field>
                <label>Last name *</label>
                <Input
                    id="lastName"
                    iconPosition="left"
                    placeholder="Doe"
                    size="large"
                    error={Boolean(error)}
                >
                    <input {...fieldProps.field} />
                </Input>
                {error &&
                    <Label basic pointing="above" color="red">{error}</Label>
                }
            </Form.Field>
        );
    };

    private renderEmailField = (fieldProps: FieldProps<IFormikValues>) => {
        const error = fieldProps.form.touched.email && fieldProps.form.errors.email;

        return (
            <Form.Field>
                <label>Email address *</label>
                <Input
                    id="email"
                    iconPosition="left"
                    placeholder="johndoe@example.com"
                    size="large"
                    error={Boolean(error)}
                >
                    <Icon name="at" />
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
                <label>Password *</label>
                <Input
                    id="password"
                    size="large"
                    type="password"
                    placeholder="Password"
                    iconPosition="left"
                    error={Boolean(error)}
                >
                    <Icon name="key" />
                    <input {...fieldProps.field} />
                </Input>
                {error &&
                    <Label basic pointing="above" color="red">{error}</Label>
                }
            </Form.Field>
        );
    };


}

export default RegisterDetail;
