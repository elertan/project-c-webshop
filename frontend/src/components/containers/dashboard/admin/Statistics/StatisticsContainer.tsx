import * as React from "react";
import { RouteProps } from "react-router";
import Statistics from "../../../../views/dashboard/admin/adminComponents/statistics";

interface IProps extends RouteProps {}
interface IState {}

class StatisticsContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return <Statistics />;
  }
}

export default StatisticsContainer;
