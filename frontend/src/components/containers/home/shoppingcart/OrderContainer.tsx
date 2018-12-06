import * as React from 'react';
import Order from "../../../views/home/shoppingcart/Order";

interface IProps {}
interface IState {}

class OrderContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Order/>
    );
  }
};

export default OrderContainer;
