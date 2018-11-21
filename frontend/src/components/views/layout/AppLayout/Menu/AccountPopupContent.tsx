import * as React from 'react';
import {Subscribe} from "unstated";
import UserState from "../../../../../states/UserState";
import {Button, Divider} from "semantic-ui-react";
import {userState} from "../../../../../index";

interface IProps {}
interface IState {}

class AccountPopupContent extends React.Component<IProps, IState> {
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
        Hi {state.state.user!.email}!
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
}

export default AccountPopupContent;
