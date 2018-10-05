import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router';

import AuthRouter from "./AuthRouter";
import HomeRouter from "./HomeRouter";
import AlbumRouter from "./AlbumRouter";

import {BrowserRouter} from "react-router-dom";
import NotFound from "../components/views/errors/NotFound/NotFound";

const DefaultRedirect = () => <Redirect to="/home/explore"/>;

// Here we can add routes to different pages (urls)
const RootRouter: React.SFC<{}> = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={DefaultRedirect} />
      <Route path="/home" component={HomeRouter} />
      <Route path="/auth" component={AuthRouter} />
      <Route path="/album" component={AlbumRouter}/>

      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default RootRouter;
