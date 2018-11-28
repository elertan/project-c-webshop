import * as React from 'react';
import {RouteProps} from "react-router";
import OrderHistory from "../../../views/dashboard/orderHistory/orderHistory";

interface IProps extends RouteProps {}
interface IState {}

class OrderHistoryContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <OrderHistory/>
    );
  }
};

export default OrderHistoryContainer;
