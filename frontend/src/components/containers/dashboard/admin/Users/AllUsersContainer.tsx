import * as React from 'react';
import {RouteProps} from "react-router";
import AllUsers from "../../../../views/dashboard/admin/adminComponents/users/AllUsers";
interface IProps extends RouteProps {}
interface IState {}

class AllUsersContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <AllUsers/>
    );
  }
};

export default AllUsersContainer;
