import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import DashboardContainer from "../components/containers/dashboard/dashboardContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";

interface IProps extends RouteComponentProps<{}> {}

const DashboardRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/:id`} component={DashboardContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default DashboardRouter;
