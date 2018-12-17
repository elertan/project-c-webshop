import * as React from 'react';
import OrderAuth from "../../../views/home/shoppingcart/OrderAuth";
import { RouteProps } from 'react-router';


interface IProps extends RouteProps { }
interface IState { }

class OrderAuthContainer extends React.Component<IProps, IState > {
  public state = {};

  public render() {
    return (
      <OrderAuth/>
    );
  }
};

export default OrderAuthContainer;
