import ApolloClient from "apollo-boost";
import * as React from 'react';
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from 'react-dom';
import App from './components/App';
import config from './config';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Provider } from "unstated";
import MusicPlayer from "./components/views/reusable/MusicPlayer/MusicPlayer";
import UserState from "./states/UserState";
import WishlistState from "./states/WishlistState";
import CartState from "./states/CartState";
import MusicPlayerState from "./states/MusicPlayerState";

const apolloClient = new ApolloClient({
  uri: config.GRAPHQL_URL
});

export const userState = new UserState();
export const wishlistState = new WishlistState();
export const cartState = new CartState();
export const musicPlayerState = new MusicPlayerState();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider inject={[userState, wishlistState, cartState, musicPlayerState]}>
      <MusicPlayer/>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
