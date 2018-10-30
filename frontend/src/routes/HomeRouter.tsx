import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import ExploreContainer from "../components/containers/home/explore/ExploreContainer";
import TrendingContainer from "../components/containers/home/trending/TrendingContainer";
import ArtistsContainer from "../components/containers/home/artists/ArtistsContainer";
import AlbumsContainer from "../components/containers/home/albums/AlbumsContainer";
import CategoriesContainer from "../components/containers/home/categories/CategoriesContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";
import SearchContainer from "../components/containers/home/search/SearchContainer";

interface IProps extends RouteComponentProps<{}> {}

const HomeRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/search`} component={SearchContainer} />

      <Route exact path={`${props.match.url}/explore`} component={ExploreContainer} />
      <Route exact path={`${props.match.url}/trending`} component={TrendingContainer} />
      <Route exact path={`${props.match.url}/artists`} component={ArtistsContainer} />
      <Route exact path={`${props.match.url}/albums`} component={AlbumsContainer} />
      <Route exact path={`${props.match.url}/categories`} component={CategoriesContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default HomeRouter;

