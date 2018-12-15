import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import NotFound from "../components/views/errors/NotFound/NotFound";
import AdminContainer from '../components/containers/dashboard/admin/Admin'

interface IProps extends RouteComponentProps<{}> {}

const AdminRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/admin`} component={AdminContainer} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AdminRouter;
