import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router';

import AuthRouter from "./AuthRouter";
import HomeRouter from "./HomeRouter";
import AlbumRouter from "./AlbumRouter";
import ArtistRouter from "./ArtistRouter";
import DashboardRouter from "./DashboardRouter"
import CategoryRouter from './CategoryRouter';
import AdminRouter from './AdminRouter';

import {BrowserRouter} from 'react-router-dom';
import NotFound from '../components/views/errors/NotFound/NotFound';
import ShoppingcartRouter from './ShoppingcartRouter';
import ConfirmOrderRouter from './ConfirmOrderRouter';

const DefaultRedirect = () => <Redirect to="/home/explore"/>;

export const routes = {
  home: {
    explore: "/home/explore",
    artists: "/home/artists",
    albums: "/home/albums",
    categories: "/home/categories"
  },
  auth: {
    register: "/auth/register"
  },
  album: (id: number) => `/album/${id}`,
  artist: (id: number) => `/artist/${id}`,
  category: (id: number) => `/category/${id}`
};

// Here we can add routes to different pages (urls)
const RootRouter: React.SFC<{}> = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={DefaultRedirect} />
      <Route path="/auth" component={AuthRouter} />
      <Route path="/home" component={HomeRouter} />
      <Route path="/album" component={AlbumRouter}/>
      <Route path="/artist" component={ArtistRouter}/>
      <Route path="/dashboard" component={DashboardRouter}/>
      <Route path="/admin" component={AdminRouter}/>
      <Route path="/category" component={CategoryRouter} />
      <Route path="/shoppingcart" component={ShoppingcartRouter} />
      <Route path="/confirmorder" component={ConfirmOrderRouter} />

      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default RootRouter;
