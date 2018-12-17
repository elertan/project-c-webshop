import * as React from "react";
import AppLayout from "../../../../layout/AppLayout/AppLayout";
import {Table, Button, Header, Icon, Label} from "semantic-ui-react";
import DashboardMenu from "../../../../reusable/DashboardMenu/DashboardMenu";
import {Formik, Field, FieldProps, FormikProps} from "formik";
import * as Yup from "yup";
import {NavLink, withRouter, RouteComponentProps} from "react-router-dom";
import {userState} from "../../../../../..//index";
import IUser from "../../../../../../models/IUser";
import BirthdatePicker from "src/components/views/reusable/BirthdatePicker/BirthdatePicker";
import * as moment from "moment";
import { withApollo, WithApolloClient } from "react-apollo";
import IApiError from "src/models/IApiError";

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
  errors: IApiError[]
}

interface IFormikValues {
  dateOfBirth: moment.Moment
}

class BirthReset extends React.Component <WithApolloClient<IProps> & RouteComponentProps<{}>, IState> {
  public state = {
    errors: []
  }
  
  public render() {
    const user = userState.state.user! as IUser;
    
    return (
      <AppLayout>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="address card"/>
            <Header.Content>
              {user.firstname} {user.lastname}
              <Header.Subheader>
                Edit your date of birth
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <DashboardMenu/>
        <div style={styles.DashboardPositioning}>
          <Formik
            initialValues={{
              dateOfBirth: moment().subtract(1, 'year')
            }}
            onSubmit={values => {
              console.log(values);
            }}
            validationSchema={Yup.object().shape({
              dateOfBirth: Yup.date().required("Please fill in your date of birth.")
            })}
          >
            {(props: FormikProps<IFormikValues>) => {
              const {
                // values,
                // touched,
                // errors,
                isSubmitting,
               // handleChange,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <Table>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <h3>
                            <b>Current Birthdate : </b>
                          </h3>
                          {user.dateOfBirth}
                        </Table.Cell>
                        <Table.Cell>
                          <div style={styles.InputSpacing}>
                          <Field>
                            {this.renderDateOfBirth}
                          </Field>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Cell>
                        <div style={styles.SaveButtonPosition}>
                          <NavLink to={"/dashboard/accountdetails"}>
                            <Button animated="fade" color="red">
                              <Button.Content visible>
                                <Icon name="cancel"/>
                                Cancel
                              </Button.Content>
                              <Button.Content hidden>
                                <Icon name="cancel"/>
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
                              <Icon name="checkmark"/>
                              Confirm
                            </Button.Content>
                            <Button.Content hidden>
                              <Icon name="checkmark"/>
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
  
  private renderDateOfBirth = (fieldProps: FieldProps<IFormikValues>) => {
    const error = fieldProps.form.touched.dateOfBirth && fieldProps.form.errors.dateOfBirth;
    return (
      <Field>
        <BirthdatePicker
          date={fieldProps.field.value}
          onChange={date => fieldProps.form.setFieldValue(fieldProps.field.name, date)}
        />
        {error &&
          <Label basic pointing="above" color="red">{error}</Label>
        }
      </Field>
    );
  };
}

export default withRouter(withApollo(BirthReset));
