import * as React from "react";
import AppLayout from "../../../../layout/AppLayout/AppLayout";
import { Table, Input, Button, Header, Icon, Label } from "semantic-ui-react";
import DashboardMenu from "../../../../reusable/DashboardMenu/DashboardMenu";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { userState } from "../../../../../..//index";
import { WithApolloClient, withApollo } from "react-apollo";
import gql from "graphql-tag";
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
  }
};

interface IProps {

}

interface IState {

}

interface IFormikValues {
  name: string,
  lastname: string
}

const editNameMutation = gql`
  mutation($data: ChangeNameInput!) {
    changeName(data: $data) {
      data
      errors {
        message
      }
    }
  }
  `;

class NameReset extends React.Component<WithApolloClient<IProps> & RouteComponentProps<{}>, IState> {
  public render() {
    const user = userState.state.user! as IUser;
    return (
      <AppLayout>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="address card" />
            <Header.Content>
              Customer Name
              <Header.Subheader>
                Update your name and/or lastname
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>

        <DashboardMenu />
        <div style={styles.DashboardPositioning}>
          <Formik
            initialValues={{
              name: "",
              lastname: ""
            }}
            onSubmit={async (values: IFormikValues, formik: FormikProps<IFormikValues>) => {
              console.log(values);
              formik.setSubmitting(true);
              const result = await this.props.client.mutate({
                mutation: editNameMutation,
                variables: {
                  data: {
                    authToken: user.token,
                    newFirstName: values.name,
                    newLastName: values.lastname
                  }
                }
              });
              console.log(result);
              //
              // HIER NOG CONTROLEREN OF HET GELUKT IS
              // GELUKT? - USER DOORVERWIJZEN NAAR DASHBOARD 
              // NIET GELUKT? - ERROR WEERGEVEN
              formik.setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("This is a required field."),
              lastname: Yup.string().required("This is a required field.")
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
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
                            <b>Current First Name : </b>
                          </h3>
                          {user.firstname}
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <Input
                              fluid
                              id="name"
                              placeholder="Enter a (new) first name here"
                              type="text"
                              value={values.name} 
                              onChange={handleChange}
                            />
                          </div>
                          {errors.name && touched.name && (
                            <div style={styles.LabelWitdh}>
                              <Label basic pointing="left" color="red">
                                {errors.name}
                              </Label>
                            </div>
                          )}{" "}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          <h3>
                            <b>Current lastname : </b>
                          </h3>
                          {user.lastname}
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <Input
                              fluid
                              id="lastname"
                              placeholder="Enter a (new) last name here"
                              type="text"
                              value={values.lastname}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.lastname && touched.lastname && (
                            <div style={styles.LabelWitdh}>
                              <Label basic pointing="left" color="red">
                                {errors.lastname}
                              </Label>
                            </div>
                          )}{" "}
                        </Table.Cell>
                      </Table.Row>

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
                            color="green"
                            animated="fade"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            <Button.Content visible>
                              <Icon name="checkmark" />
                              Confirm
                            </Button.Content>
                            <Button.Content hidden>
                              <Icon name="checkmark" />
                              Confirm
                            </Button.Content>
                          </Button>
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

export default withRouter(withApollo(NameReset));
