import * as React from "react";
import { RouteProps } from "react-router";
import FinanceStats from "../../../../views/dashboard/admin/adminComponents/statistics/FinanceStats";

interface IProps extends RouteProps {}
interface IState {}

class FinanceStatsContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return <FinanceStats />;
  }
}

export default FinanceStatsContainer;
