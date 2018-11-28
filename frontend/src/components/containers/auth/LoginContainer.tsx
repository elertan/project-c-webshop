import * as React from 'react';
import {RouteProps} from "react-router";
import LoginDetail from "../../views/auth/login/LoginDetail";

interface IProps extends RouteProps {}
interface IState {}

class LoginContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <LoginDetail/>
    );
  }
};

export default LoginContainer;
