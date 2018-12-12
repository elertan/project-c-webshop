import * as React from "react";
import { Table, Button, Input, Header, Icon, Label } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const styles = {
  DashboardPositioning: {
    display: "inline-block",
    width: "60%",
    padding: "3%",
    margin: "3% 0 0 20vw"
  },
  HeaderPositioning: {
    margin: "3% 0 0 40%"
  },
  ButtonGroup: {
    display: "inline-block"
  },

  InputSpacing: {
    display: "inline-block",
    width: "15vw"
  },
  LabelWitdh: {
    maxWidth: "10vw",
    display: "inline-block"
  }
};

class PasswordReset extends React.Component {
  public state = {
    PasswordInput: "password",
    active: true,
    redirect: false
  };

  public togglePasswordVisibility = () =>
    this.setState({
      active: !this.state.active
    });

  public render() {
    let ConfirmButton = <Button>Confirm</Button>;
    if (this.state.redirect) {
      ConfirmButton = (
        <NavLink to={""}>
          <Button>Confirm</Button>
        </NavLink>
      );
    }
    let showPassword = (
      <Button
        color="blue"
        type="button"
        animated="fade"
        onClick={this.togglePasswordVisibility}
      >
        <Button.Content visible>Show password</Button.Content>
        <Button.Content hidden>Show password</Button.Content>
      </Button>
    );
    if (!this.state.active) {
      showPassword = (
        <Button
          color="green"
          type="button"
          animated="fade"
          onClick={this.togglePasswordVisibility}
        >
          <Button.Content visible>Hide password</Button.Content>
          <Button.Content hidden>Hide password</Button.Content>
        </Button>
      );
      this.state.PasswordInput = "";
    } else {
      showPassword = (
        <Button
          color="blue"
          type="button"
          animated="fade"
          onClick={this.togglePasswordVisibility}
        >
          <Button.Content visible>Show password</Button.Content>
          <Button.Content hidden>Show password</Button.Content>
        </Button>
      );
      this.state.PasswordInput = "password";
    }
    return (
      <div>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="key" />
            <Header.Content>
              Password reset
              <Header.Subheader>Reset your password</Header.Subheader>
            </Header.Content>
          </Header>
        </div>

        <div style={styles.DashboardPositioning}>
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              repeatNewPassword: ""
            }}
            onSubmit={values => {
              console.log(values);
              this.setState({
                redirect: true
              });
              console.log(this.state.redirect);
            }}
            validationSchema={Yup.object().shape({
              currentPassword: Yup.string().required(
                "Please fill in your current password"
              ),
              newPassword: Yup.string()
                .required("Please fill in your new password")
                .min(5, "New password should be atleast 5 characters long"),
              repeatNewPassword: Yup.string()
                .required("Please repeat your new password")
                .min(5, "New password should be atleast 5 characters long")
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
                          <h3>Current password :</h3>
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <Input
                              fluid
                              placeholder="Current password"
                              id="currentPassword"
                              value={values.currentPassword}
                              onChange={handleChange}
                              type={this.state.PasswordInput}
                            />
                          </div>
                          {errors.currentPassword &&
                            touched.currentPassword && (
                              <div style={styles.LabelWitdh}>
                                <Label basic pointing="left" color="red">
                                  {errors.currentPassword}
                                </Label>
                              </div>
                            )}{" "}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <h3>New password :</h3>
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <Input
                              fluid
                              placeholder="New password"
                              id="newPassword"
                              value={values.newPassword}
                              onChange={handleChange}
                              type={this.state.PasswordInput}
                            />
                          </div>
                          {errors.newPassword && touched.newPassword && (
                            <div style={styles.LabelWitdh}>
                              <Label basic pointing="left" color="red">
                                {errors.newPassword}
                              </Label>
                            </div>
                          )}{" "}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <h3>Confirm new password :</h3>
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                            <Input
                              fluid
                              placeholder="Confirm new password"
                              id="repeatNewPassword"
                              value={values.repeatNewPassword}
                              onChange={handleChange}
                              type={this.state.PasswordInput}
                            />
                          </div>{" "}
                          {errors.repeatNewPassword &&
                            touched.repeatNewPassword && (
                              <div style={styles.LabelWitdh}>
                                <Label basic pointing="left" color="red">
                                  {errors.repeatNewPassword}
                                </Label>
                              </div>
                            )}{" "}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Cell>
                        <div style={styles.ButtonGroup}>
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
                          {ConfirmButton}

                          {showPassword}
                        </div>
                      </Table.Cell>
                    </Table.Body>
                  </Table>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    );
  }
}

export default PasswordReset;
