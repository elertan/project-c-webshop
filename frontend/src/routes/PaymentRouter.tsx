import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";

import NotFound from "../components/views/errors/NotFound/NotFound";
import PaymentContainer from 'src/components/containers/home/shoppingcart/PaymentContainer';

interface IProps extends RouteComponentProps<{}> {}

const PaymentRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/payment`} component={PaymentContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default PaymentRouter;
