import * as React from 'react';
import { RouterProps } from 'react-router';
import Home from '../views/Home/Home';

interface IState extends RouterProps {}
interface IProps {}

class HomeContainer extends React.Component<IProps, IState> {
  public render() {
    return (
      <Home />
    );
  }
}

export default HomeContainer;
