import * as React from 'react';
import {RouteProps} from "react-router";
import User from "../../../../views/dashboard/admin/adminComponents/users/Users";
interface IProps extends RouteProps {}
interface IState {}

class UserContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <User/>
    );
  }
};

export default UserContainer;
