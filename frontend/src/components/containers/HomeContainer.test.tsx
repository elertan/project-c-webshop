import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HomeContainer from './HomeContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomeContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
