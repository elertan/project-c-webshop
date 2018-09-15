import * as React from 'react';
import {Redirect, Route} from 'react-router';

import AuthRouter from "./AuthRouter";
import HomeRouter from "./HomeRouter";
import {BrowserRouter} from "react-router-dom";

const NotFound: React.SFC<{}> = () => (
  <div>Not found</div>
);

const DefaultRedirect = () => <Redirect to="/home/explore"/>;

// Here we can add routes to different pages (urls)
const RootRouter: React.SFC<{}> = () => (
  <BrowserRouter>
    <>
      <Route exact path="/" component={DefaultRedirect} />
      <Route path="/home" component={HomeRouter} />
      <Route path="/auth" component={AuthRouter} />

      <Route component={NotFound} />
    </>
  </BrowserRouter>
);

export default RootRouter;
