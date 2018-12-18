import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import NotFound from "../components/views/errors/NotFound/NotFound";
import AdminContainer from "../components/containers/dashboard/admin/Admin";
import ProductsContainer from "../components/containers/dashboard/admin/Products/ProductsContainer";
import AddProductsContainer from "../components/containers/dashboard/admin/Products/AddProductsContainer";

interface IProps extends RouteComponentProps<{}> {}

const AdminRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`/admin`} component={AdminContainer} />
      <Route exact path={`/admin/products`} component={ProductsContainer} />
      <Route
        exact
        path={`/admin/addproduct`}
        component={AddProductsContainer}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AdminRouter;
