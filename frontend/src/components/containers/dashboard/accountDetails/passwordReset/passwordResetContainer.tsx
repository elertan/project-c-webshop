import * as React from 'react';
import {RouteProps} from "react-router";
import PasswordReset from "../../../../views/dashboard/accountDetails/passwordReset/passwordReset";

interface IProps extends RouteProps {}
interface IState {}

class PasswordResetContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <PasswordReset/>
    );
  }
};

export default PasswordResetContainer;
