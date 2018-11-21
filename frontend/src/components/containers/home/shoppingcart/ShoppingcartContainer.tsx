import * as React from 'react';
import ShoppingCart from "../../../views/home/shoppingcart/shoppingcart";

interface IProps {}
interface IState {}

class ShoppingcartContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <ShoppingCart/>
    );
  }
};

export default ShoppingcartContainer;
