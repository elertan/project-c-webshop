import * as React from 'react';
import {RouteProps} from "react-router";
import AddProduct from "../../../../views/dashboard/admin/adminComponents/products/AddProduct";

interface IProps extends RouteProps {}
interface IState {}

class AddProductContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <AddProduct/>
    );
  }
};

export default AddProductContainer;
