import * as React from 'react';
import AccountDetails from "../../../views/dashboard/accountDetails/acountDetails";

interface IProps {}
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
