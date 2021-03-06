import * as React from "react";
import AppLayout from "../../../../layout/AppLayout/AppLayout";
import {
  Table,
  Input,
  Button,
  Header,
  Icon,
  Label
} from "semantic-ui-react";
import DashboardMenu from "../../../../reusable/DashboardMenu/DashboardMenu";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { userState } from "../../../../../..//index";
import gql from "graphql-tag";
import { withApollo, WithApolloClient } from "react-apollo";
import IApiError from "src/models/IApiError";
import IUser from "../../../../../../models/IUser";

const styles = {
  DashboardPositioning: {
    display: "inline-block",
    width: "60%",
    padding: "3%"
  },
  HeaderPositioning: {
    margin: "3% 0 0 0"
  },
  InputSpacing: {
    display: "inline-block",
    width: "15vw"
  },
  SaveButtonPosition: {
    display: "inline-block"
  },
  LabelWitdh: {
    maxWidth: "6vw",
    display: "inline-block"
  },
  modalContentPositioning: {
    maxWidth: "40vw",
    marginabove: "30vw"
  }
};

const editEmailMutation = gql`
  mutation ($data: ChangeEmailInput!) {
    changeEmail(data: $data) {
      data
      errors {
        message
      }
    }
  }
  `;

interface IProps {

}

interface IState {
  errors: IApiError[],
}

interface IFormikValues {
  email: string,
  confirmemail: string
}

class EmailReset extends React.Component<WithApolloClient<IProps> & RouteComponentProps<{}>, IState> {
  public state = {
    errors: [],
  };

  public render() {
    const user = userState.state.user! as IUser;
    return (
      <AppLayout>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="mail" />
            <Header.Content>
              Customer E-mail
              <Header.Subheader>Update your E-mail</Header.Subheader>
            </Header.Content>
          </Header>
        </div>

        <DashboardMenu />
        <div style={styles.DashboardPositioning}>
          <Formik
            initialValues={{
              email: "",
              confirmemail: ""
            }}
            onSubmit={async (values: IFormikValues, formik: FormikProps<IFormikValues>) => {
              console.log(values);
              formik.setSubmitting(true);
              const result = await this.props.client.mutate({
                mutation: editEmailMutation,
                variables: {
                  data: {
                    authToken: user.token,
                    newEmail: values.email,
                  }
                }
              });
              // console.log("From emailReset | Result is:", result);
              // console.log("Result data! is: ", result.data!);
              
              const mutationErrors = result.data!.changeEmail.errors;
              // console.log("emailReset Mutation error: ", mutationErrors);
              if (mutationErrors) {
                this.setState({ errors: mutationErrors })
              } else {
                if (this.state.errors.length > 0) {
                  this.setState({ errors: [] })
                }
                user.email = values.email;
                userState.login(user);
                this.props.history.replace("/dashboard/accountdetails");
              }
              formik.setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required("Please fill in a new email")
                .email("New email should be a valid email address"),
              confirmemail: Yup.string()
                .oneOf([Yup.ref("email"), null], "Emails do not match")
                .required("Please retype your new email")
                .email("Email should be a valid email")
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleSubmit
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <Table>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <h3>
                            <b>Current Email : </b>
                          </h3>
                          {user.email}
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <label><strong>New email address:</strong></label>
                            <Input
                              fluid
                              id="email"
                              placeholder="Modify email"
                              type="text"
                              value={values.email}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.email && touched.email && (
                            <div style={styles.LabelWitdh}>
                              <Label basic pointing="above" color="red">
                                {errors.email}
                              </Label>
                            </div>
                          )}{" "}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <h3>
                            <b>Confirm email : </b>
                          </h3>
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <label><strong>Confirm your new email address:</strong></label>
                            <Input
                              fluid
                              id="confirmemail"
                              placeholder="Confirm new email"
                              type="text"
                              value={values.confirmemail}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.confirmemail && touched.confirmemail && (
                            <div style={styles.LabelWitdh}>
                              <Label basic pointing="above" color="red">
                                {errors.confirmemail}
                              </Label>
                            </div>
                          )}{" "}
                        </Table.Cell>
                      </Table.Row>

                      {/* Confirm and return button */}
                      <Table.Cell>
                        <div style={styles.SaveButtonPosition}>
                          <NavLink to={"/dashboard/accountdetails"}>
                            <Button animated="fade" color="red">
                              <Button.Content visible>
                                <Icon name="cancel" />
                                Cancel
                              </Button.Content>
                              <Button.Content hidden>
                                <Icon name="cancel" />
                                Cancel
                              </Button.Content>
                            </Button>
                          </NavLink>
                          <Button
                            animated="fade"
                            color="green"
                            type="submit"
                          >
                            <Button.Content visible>Continue</Button.Content>
                            <Button.Content hidden>Continue</Button.Content>
                          </Button>
                          {this.state.errors.length > 0 &&
                            <p style={{ textAlign: 'center', marginTop: 15, color: 'red' }}>{(this.state.errors[0] as IApiError).message}</p>
                          }
                        </div>
                      </Table.Cell>
                    </Table.Body>
                  </Table>
                </form>
              );
            }}
          </Formik>
        </div>
      </AppLayout>
    );
  }
}

export default withRouter(withApollo(EmailReset));
