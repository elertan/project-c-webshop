import * as React from 'react';
import {RouteProps} from "react-router";
import Admin from "../../../views/dashboard/admin/Admin";

interface IProps extends RouteProps {}
interface IState {}

class AdminContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Admin/>
    );
  }
};

export default AdminContainer;
