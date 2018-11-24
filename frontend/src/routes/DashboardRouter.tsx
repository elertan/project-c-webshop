import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import AcountDetailsContainer from "../components/containers/dashboard/accountDetails/accountDetailsContainer";
import PaymentMethodsContainer from "../components/containers/dashboard/paymentDetails/paymentDetailsContainer"
import OrderHistoryContainer from "../components/containers/dashboard/orderHistory/orderHistoryContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";

interface IProps extends RouteComponentProps<{}> {}

const DashboardRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/accountdetails`} component={AcountDetailsContainer} />
      <Route exact path={`${props.match.url}/orderhistory`} component={OrderHistoryContainer} />
      <Route exact path={`${props.match.url}/paymentmethods`} component={PaymentMethodsContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default DashboardRouter;
