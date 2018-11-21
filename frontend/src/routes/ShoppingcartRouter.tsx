import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";

import NotFound from "../components/views/errors/NotFound/NotFound";
import ShoppingcartContainer from 'src/components/containers/home/shoppingcart/ShoppingcartContainer';

interface IProps extends RouteComponentProps<{}> {}

const ShoppingcartRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/shoppingcart`} component={ShoppingcartContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default ShoppingcartRouter;
