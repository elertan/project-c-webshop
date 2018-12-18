import * as React from 'react';
import {RouteProps} from "react-router";
import Product from "../../../../views/dashboard/admin/adminComponents/products/Products";
interface IProps extends RouteProps {}
interface IState {}

class ProductContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Product/>
    );
  }
};

export default ProductContainer;
