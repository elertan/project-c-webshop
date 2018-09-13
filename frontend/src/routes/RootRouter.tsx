import * as React from 'react';
import { Route, Router } from 'react-router';

import createHistory from 'history/createBrowserHistory';
import HomeContainer from '../components/containers/HomeContainer';
import AuthRouter from "./AuthRouter";

// History stores browser history
const history = createHistory();

// Here we can add routes to different pages (urls)
const RootRouter: React.SFC<{}> = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/auth" component={AuthRouter} />
    </div>
  </Router>
);

export default RootRouter;
