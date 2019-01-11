import * as React from "react";
import { RouteProps } from "react-router";
import Overview from "../../../../views/dashboard/admin/adminComponents/statistics/Overview";

interface IProps extends RouteProps {}
interface IState {}

class StatisticsOverviewContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return <Overview />;
  }
}

export default StatisticsOverviewContainer;
