import ApolloClient from "apollo-boost";
import * as React from 'react';
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from 'react-dom';
import App from './components/App';
import config from './config';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import { Provider } from "unstated";

const apolloClient = new ApolloClient({
  uri: config.GRAPHQL_URL
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider>  
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
