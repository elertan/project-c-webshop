import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import ExploreContainer from "../components/containers/home/explore/ExploreContainer";
import TrendingContainer from "../components/containers/home/trending/TrendingContainer";
import ArtistsContainer from "../components/containers/home/artists/ArtistsContainer";
import AlbumsContainer from "../components/containers/home/albums/AlbumsContainer";
import GenresContainer from "../components/containers/home/genres/GenresContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";
<<<<<<< HEAD
import ArtistsContainer from "../components/containers/home/artists/ArtistsContainer";
=======
import SearchContainer from "../components/containers/home/search/SearchContainer";
>>>>>>> dev

interface IProps extends RouteComponentProps<{}> {}

const HomeRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/search`} component={SearchContainer} />

      <Route exact path={`${props.match.url}/explore`} component={ExploreContainer} />
      <Route exact path={`${props.match.url}/trending`} component={TrendingContainer} />
      <Route exact path={`${props.match.url}/artists`} component={ArtistsContainer} />
      <Route exact path={`${props.match.url}/albums`} component={AlbumsContainer} />
<<<<<<< HEAD
      <Route exact path={`${props.match.url}/artists`} component={ArtistsContainer} />
=======
      <Route exact path={`${props.match.url}/genres`} component={GenresContainer} />
>>>>>>> dev

      <Route component={NotFound} />
    </Switch>
  );
};

export default HomeRouter;

