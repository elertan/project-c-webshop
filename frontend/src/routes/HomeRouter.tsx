import * as React from 'react';
import {Route, RouteComponentProps} from "react-router";
import ExploreContainer from "../components/containers/home/explore/ExploreContainer";

interface IProps extends RouteComponentProps<{}> {}

const HomeRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Route path={`${props.match.url}/explore`} component={ExploreContainer} />
  );
};

export default HomeRouter;

