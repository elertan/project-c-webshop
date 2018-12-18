import * as React from 'react';
import {RouteProps} from "react-router";
import AllProducts from "../../../../views/dashboard/admin/adminComponents/products/AllProducts";
interface IProps extends RouteProps {}
interface IState {}

class AllProductsContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <AllProducts/>
    );
  }
};

export default AllProductsContainer;
