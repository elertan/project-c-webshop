import * as React from "react";
import { RouteProps } from "react-router";
import UserStats from "../../../../views/dashboard/admin/adminComponents/statistics/UserStats";

interface IProps extends RouteProps {}
interface IState {}

class UserStatsContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return <UserStats />;
  }
}

export default UserStatsContainer;
