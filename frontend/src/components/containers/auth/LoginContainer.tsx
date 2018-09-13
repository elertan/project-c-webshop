import * as React from 'react';
import {RouteProps} from "react-router";
import Login from "../../views/auth/login/Login";

interface IProps extends RouteProps {}
interface IState {}

class LoginContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Login/>
    );
  }
};

export default LoginContainer;
