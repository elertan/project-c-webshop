import * as React from "react";
import AppLayout from "../../../../layout/AppLayout/AppLayout";
import {
  Table,
  Input,
  Button,
  Header,
  Icon,
  Label,
  Modal
} from "semantic-ui-react";
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
  },
  modalContentPositioning: {
    maxWidth: "40vw",
    marginLeft: "30vw"
  }
};

class EmailReset extends React.Component {
  public state = {
    openModal: false,
    confirm: false
  };

  public confirmModalIsAllowed = () =>
    this.setState({
      confirm: true
    });

  public closePasswordModal = () =>
    this.setState({
      openModal: false
    });

  public openPasswordModal = () => {
    this.setState({
      openModal: this.state.confirm
    });
  };
  public render() {
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
            onSubmit={this.confirmModalIsAllowed}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required("Please fill in an email")
                .email("Email should be a valid email"),
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
                            <b>Email : </b>
                          </h3>
                          {"tim-prins@live.nl"}
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
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
                              <Label basic pointing="left" color="red">
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
                              <Label basic pointing="left" color="red">
                                {errors.confirmemail}
                              </Label>
                            </div>
                          )}{" "}
                        </Table.Cell>
                      </Table.Row>

                      {/* Confirm and return button */}
                      {/* Confirm and return button */}
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
                            onClick={this.openPasswordModal}
                          >
                            <Button.Content visible>Continue</Button.Content>
                            <Button.Content hidden>Continue</Button.Content>
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Body>
                  </Table>
                </form>
              );
            }}
          </Formik>

          {/* Modal */}
          {/* Modal */}
          {/* Modal */}
          <Modal
            style={styles.modalContentPositioning}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={this.state.openModal}
            basic
            size="fullscreen"
          >
            <Header icon="key" content="Confirm Email change" />
            <Modal.Content>
              <p>
                Are you sure you want to change
                {" Current email"} into {"New email"}
              </p>
              <br />
              <p>Fill in your password to confirm it's you!</p>
              <Input placeholder="Fill in password" type="password" />
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={this.closePasswordModal} inverted>
                <Button.Content>
                  <Icon name="remove" /> Back
                </Button.Content>
              </Button>
              <Button color="green" animated="fade">
                <Button.Content visible>
                  <Icon name="checkmark" /> Confirm email change
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="checkmark" /> Confirm email change
                </Button.Content>
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </AppLayout>
    );
  }
}

export default EmailReset;
