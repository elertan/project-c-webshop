import * as React from 'react';
import {RouteProps} from "react-router";
import EmailReset from "../../../../views/dashboard/accountDetails/emailReset/emailReset";

interface IProps extends RouteProps {}
interface IState {}

class EmailResetContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <EmailReset/>
    );
  }
};

export default EmailResetContainer;
