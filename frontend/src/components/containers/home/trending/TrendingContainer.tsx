import * as React from 'react';
import Trending from "../../../views/home/trending/Trending";

interface IProps {}
interface IState {}

class TrendingContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Trending/>
    );
  }
};

export default TrendingContainer;
