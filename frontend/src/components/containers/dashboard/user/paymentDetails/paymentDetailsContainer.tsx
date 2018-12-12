import * as React from 'react';
import {RouteProps} from "react-router";
import PaymentDetails from "../../../../views/dashboard/user/paymentDetails/PaymentDetails";

interface IProps extends RouteProps {}
interface IState {}

class PaymentDetailsContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <PaymentDetails/>
    );
  }
};

export default PaymentDetailsContainer;
