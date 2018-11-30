import * as React from 'react';
import {RouteProps} from "react-router";
import NameReset from "../../../../views/dashboard/accountDetails/nameReset/nameReset";

interface IProps extends RouteProps {}
interface IState {}

class NameResetContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <NameReset/>
    );
  }
};

export default NameResetContainer;
