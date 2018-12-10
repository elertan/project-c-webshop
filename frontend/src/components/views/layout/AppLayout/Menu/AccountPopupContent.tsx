import * as React from 'react';
import {Subscribe} from "unstated";
import UserState from "../../../../../states/UserState";
import {Button, Divider} from "semantic-ui-react";
import {userState} from "../../../../../index";
import {RouteComponentProps, withRouter} from "react-router";

interface IProps {}
interface IState {}

class AccountPopupContent extends React.Component<IProps & RouteComponentProps<{}>, IState> {
  public state = {};

  public render() {
    return (
      <Subscribe to={[UserState]}>
        {this.renderWithUserState}
      </Subscribe>
    );
  }

  private renderWithUserState = (state: UserState) => {
    return (
      <div>
        <strong>Hi, {state.state.user!.firstname} {state.state.user!.lastname}!</strong>
        <Divider/>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button
            onClick={this.handleMyAccountClick}
          >
            My Account
          </Button>
        </div>
        <Divider/>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button
            primary
            onClick={this.handleLogoutClick}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  };

  private handleLogoutClick = () => {
    userState.logout();
  };

  private handleMyAccountClick = () => {
    this.props.history.push("/dashboard/accountdetails");
  };
}

export default withRouter(AccountPopupContent);
