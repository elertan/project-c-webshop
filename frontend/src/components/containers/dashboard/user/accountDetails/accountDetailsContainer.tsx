import * as React from 'react';
import {RouteProps} from "react-router";
import AccountDetails from "../../../../views/dashboard/user/accountDetails/accountDetails";

interface IProps extends RouteProps {}
interface IState {}

class AcountDetailsContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <AccountDetails/>
    );
  }
};

export default AcountDetailsContainer;
