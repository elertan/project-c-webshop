import * as React from 'react';
import {RouteProps} from "react-router";
import Dashboard from "../../views/dashboard/dashboard";

interface IProps extends RouteProps {}
interface IState {}

class DashboardContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Dashboard/>
    );
  }
};

export default DashboardContainer;
