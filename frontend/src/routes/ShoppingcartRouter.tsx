import * as React from "react";
import { Route, RouteComponentProps, Switch, Redirect } from "react-router";

import NotFound from "../components/views/errors/NotFound/NotFound";
import ShoppingcartContainer from "src/components/containers/home/shoppingcart/ShoppingcartContainer";
import OrderContainer from "src/components/containers/home/shoppingcart/OrderContainer";
import { Subscribe } from "unstated";
import CartState from "src/states/CartState";

interface IProps extends RouteComponentProps<{}> {}

const ShoppingcartRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Subscribe to={[CartState]}>
        {(cartState: CartState) => {
          // Don't make routes visible to guest users
          if (cartState.state.products.length === 0) {
            return <Redirect to="/home/explore" />;
          }
          return (
            <>
              <Route
                exact
                path={`${props.match.url}`}
                component={ShoppingcartContainer}
              />
              <Route
                exact
                path={`${props.match.url}/order`}
                component={OrderContainer}
              />
              <Route component={NotFound} />
            </>
          );
        }}
      </Subscribe>
    </Switch>
  );
};

export default ShoppingcartRouter;
