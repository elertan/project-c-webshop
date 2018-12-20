import * as React from 'react';
import { RouteProps } from 'react-router';
import AccountOrder from 'src/components/views/home/shoppingcart/AccountOrder';


interface IProps extends RouteProps { }
interface IState { }

class AccountOrderContainer extends React.Component<IProps, IState > {
  public state = {};

  public render() {
    return (
      <AccountOrder/>
    );
  }
};

export default AccountOrderContainer;
