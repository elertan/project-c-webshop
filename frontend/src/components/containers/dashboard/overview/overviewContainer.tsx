import * as React from 'react';
import {RouteProps} from "react-router";
import Overview from "../../../views/dashboard/overview/overview";

interface IProps extends RouteProps {}
interface IState {}

class OverviewContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Overview/>
    );
  }
};

export default OverviewContainer;
