import * as React from 'react';
import Payment from "../../../views/home/shoppingcart/Payment";

interface IProps {}
interface IState {}

class PaymentContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Payment/>
    );
  }
};

export default PaymentContainer;
