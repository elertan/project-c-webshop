import * as React from 'react';
import Order from "../../../views/home/shoppingcart/Order";
import { RouteProps } from 'react-router';


interface IProps extends RouteProps { }
interface IState { }

class OrderContainer extends React.Component<IProps, IState > {
  public state = {};

  public render() {
    return (
      <Order/>
    );
  }
};

export default OrderContainer;
