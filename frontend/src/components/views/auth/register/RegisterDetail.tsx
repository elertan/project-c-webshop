import * as React from "react";
import * as Yup from 'yup';
import { Button, Icon, Input, Form, Label } from "semantic-ui-react";
import { Field, FieldProps, Formik, FormikProps } from "formik";
import AppLayout from "../../layout/AppLayout/AppLayout";
import gql from "graphql-tag";
import IApiError from "../../../../models/IApiError";
import IApiResult from "../../../../models/IApiResult";
import IUser from "../../../../models/IUser";
import { userState } from "../../../../index";
import { withApollo, WithApolloClient } from "react-apollo";

interface IProps {

}

interface IState {
    errors: IApiError[];
}

interface IFormikValues {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    dateOfBirth: string
};

const createAccountMutation = gql`
mutation ($createAccount: CreateAccountInput!) {
    createAccount(account: $createAccount) {
        data {
            email
            firstname
            lastname
        }
        errors {
            message
        }
    }
}
`;

const initialValues: IFormikValues = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dateOfBirth: ""
};

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("A first name is required"),
    lastname: Yup.string().required("A last name is required"),
    email: Yup.string().required("Email is a required field").email("Entered email is not a valid email"),
    password: Yup.string().required("Password is a required field").min(5, "Password should be at least 5 characters."),
    dateOfBirth: Yup.date().notRequired()
});

class RegisterDetail extends React.Component<WithApolloClient<IProps>, IState> {
    public state = {
        errors: []
    };

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

    private handleSubmit = async (values: IFormikValues, formik: FormikProps<IFormikValues>) => {
        console.log("Handling submit");
        formik.setSubmitting(true);
        console.log("values: ", values)
        const result = await this.props.client.mutate({
            mutation: createAccountMutation,
            variables: {
                createAccount: {
                    email: values.email,
                    password: values.password,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    dateOfBirth: values.dateOfBirth
                }
            }
        });
        console.log("Result is: ", result);

        const apiResult = result.data!.createAccount as IApiResult<IUser>;
        console.log("apiResult is: ", apiResult);
        if (apiResult.errors) {
            this.setState({ errors: apiResult.errors })
        } else {
            if (this.state.errors.length > 0) {
                this.setState({ errors: [] })
            }
            userState.setUser(apiResult.data!);
        }
        formik.setSubmitting(false);
    };

    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <div style={{ marginTop: "50px" }}>
                <Form className="ui form">
                    <h2 className="ui dividing header">Welcome to Marshmallow</h2>
                    <div className="fields">
                        <div className="field">
                            <Field
                                name="firstname"
                                render={this.renderFirstNameField}
                            />
                        </div>
                        <div className="field">
                            <Field
                                name="lastname"
                                render={this.renderLastNameField}
                            />
                        </div>
                    </div>
                    <div className="fields">
                        <div className="field">
                            <Field
                                name="dateOfBirth"
                                render={this.renderDateOfBirth}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: "15px", marginTop: "40px" }}>
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
                    {this.state.errors.length > 0 &&
                        <p style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>{(this.state.errors[0] as IApiError).message}</p>
                    }
                </Form>
            </div>
        )
    }

    private renderFirstNameField = (fieldProps: FieldProps<IFormikValues>) => {
        const error = fieldProps.form.touched.firstname && fieldProps.form.errors.firstname;

        return (

            <Form.Field>
                <label>First name *</label>
                <Input
                    id="firstname"
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

    private renderLastNameField = (fieldProps: FieldProps<IFormikValues>) => {
        const error = fieldProps.form.touched.lastname && fieldProps.form.errors.lastname;

        return (
            <Form.Field>
                <label>Last name *</label>
                <Input
                    id="lastname"
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

    private renderDateOfBirth = (fieldProps: FieldProps<IFormikValues>) => {
        const error = fieldProps.form.touched.dateOfBirth && fieldProps.form.errors.dateOfBirth;

        return (
            <Form.Field>
                <label>Date of birth</label>
                <Input
                    id="dateOfBirth"
                    iconPosition="left"
                    placeholder="dd/mm/year"
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

export default withApollo(RegisterDetail);
