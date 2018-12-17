import * as React from 'react';
import {RouteProps} from "react-router";
import PasswordResetSucces from "../../../../../views/dashboard/user/accountDetails/passwordReset/passwordResetSucces";

interface IProps extends RouteProps {}
interface IState {}

class PasswordResetSuccesContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <PasswordResetSucces/>
    );
  }
};

export default PasswordResetSuccesContainer;
