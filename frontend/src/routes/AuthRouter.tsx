import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import LoginContainer from "../components/containers/auth/LoginContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";

interface IProps extends RouteComponentProps<{}> {}

const AuthRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/login`} component={LoginContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default AuthRouter;
