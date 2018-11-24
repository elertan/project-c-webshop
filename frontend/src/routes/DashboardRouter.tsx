import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import DashboardContainer from "../components/containers/dashboard/dashboardContainer";
import AcountDetailsContainer from "../components/containers/dashboard/accountDetails/accountDetailsContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";

interface IProps extends RouteComponentProps<{}> {}

const DashboardRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/:id`} component={DashboardContainer} />
      <Route exact path={`${props.match.url}/accountdetails`} component={AcountDetailsContainer} />
      <Route exact path={`${props.match.url}/orderhistory`} component={AcountDetailsContainer} />
      <Route exact path={`${props.match.url}/paymentmethods`} component={AcountDetailsContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default DashboardRouter;
