import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import ExploreContainer from "../components/containers/home/explore/ExploreContainer";
import TrendingContainer from "../components/containers/home/trending/TrendingContainer";
import AlbumsContainer from "../components/containers/home/albums/AlbumsContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";

interface IProps extends RouteComponentProps<{}> {}

const HomeRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/explore`} component={ExploreContainer} />
      <Route exact path={`${props.match.url}/trending`} component={TrendingContainer} />
      <Route exact path={`${props.match.url}/albums`} component={AlbumsContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default HomeRouter;

