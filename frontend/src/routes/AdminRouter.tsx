import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import NotFound from "../components/views/errors/NotFound/NotFound";
import AdminContainer from "../components/containers/dashboard/admin/Admin";

import ProductsContainer from "../components/containers/dashboard/admin/Products/ProductContainer";
import AllProductsContainer from "../components/containers/dashboard/admin/Products/AllProductsContainer";
import AddProductsContainer from "../components/containers/dashboard/admin/Products/AddProductsContainer";

import UserContainer from "../components/containers/dashboard/admin/Users/UserContainer";
import AllUsersContainer from "../components/containers/dashboard/admin/Users/AllUsersContainer";
import AddUserContainer from "../components/containers/dashboard/admin/Users/AddUserContainer";

import StatisticsContainer from "../components/containers/dashboard/admin/Statistics/StatisticsContainer";

interface IProps extends RouteComponentProps<{}> {}

const AdminRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`/admin`} component={AdminContainer} />
      
      <Route exact path={`/admin/products`} component={ProductsContainer} />
      <Route exact path={`/admin/products/all`} component={AllProductsContainer} />
      <Route exact path={`/admin/products/addproduct`} component={AddProductsContainer} />

      <Route exact path={`/admin/users`} component={UserContainer} />
      <Route exact path={`/admin/users/all`} component={AllUsersContainer} />
      <Route exact path={`/admin/users/adduser`} component={AddUserContainer} />

      <Route exact path={`/admin/statistics`} component={StatisticsContainer} />
      
      <Route component={NotFound} />
    </Switch>
  );
};

export default AdminRouter;
