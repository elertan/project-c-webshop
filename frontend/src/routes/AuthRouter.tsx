import * as React from 'react';
import {Route, RouteComponentProps} from "react-router";
import LoginContainer from "../components/containers/auth/LoginContainer";

interface IProps extends RouteComponentProps<{}> {}

const AuthRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Route path={`${props.match.url}/login`} component={LoginContainer} />
  );
};

export default AuthRouter;
