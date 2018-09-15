import * as React from 'react';
import {Route, RouteComponentProps} from "react-router";
import ExploreContainer from "../components/containers/home/explore/ExploreContainer";
import TrendingContainer from "../components/containers/home/trending/TrendingContainer";

interface IProps extends RouteComponentProps<{}> {}

const HomeRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <>
      <Route path={`${props.match.url}/explore`} component={ExploreContainer} />
      <Route path={`${props.match.url}/trending`} component={TrendingContainer} />
    </>
  );
};

export default HomeRouter;

