import * as React from "react";
import AppLayout from "../../../../layout/AppLayout/AppLayout";
import { Table, Input, Button, Header, Icon, Label } from "semantic-ui-react";
import DashboardMenu from "../../../../reusable/DashboardMenu/DashboardMenu";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";

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

class NameReset extends React.Component {
  public render() {
    return (
      <AppLayout>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="address card" />
            <Header.Content>
              Customer Name
              <Header.Subheader>
                Update your name, infix and/or surname
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>

        <DashboardMenu />
        <div style={styles.DashboardPositioning}>
          <Formik
            initialValues={{
              name: "",
              infix: "",
              surname: ""
            }}
            onSubmit={values => {
              console.log(values);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Please fill in name"),
              infix: Yup.string(),
              surname: Yup.string().required("Please fill in surname")
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
                            <b>Current Name : </b>
                          </h3>
                          {"Tim"}
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <Input
                              fluid
                              id="name"
                              placeholder="Modify name"
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
                            <b>Current Infix : </b>
                          </h3>
                          {""}
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <Input
                              fluid
                              id="infix"
                              placeholder="Modify infix"
                              type="text"
                              value={values.infix}
                              onChange={handleChange}
                            />
                          </div>
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <h3>
                            <b>Current Surname : </b>
                          </h3>
                          {"Prins"}
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <Input
                              fluid
                              id="surname"
                              placeholder="Modify surname"
                              type="text"
                              value={values.surname}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.surname && touched.surname && (
                            <div style={styles.LabelWitdh}>
                              <Label basic pointing="left" color="red">
                                {errors.surname}
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

export default NameReset;
