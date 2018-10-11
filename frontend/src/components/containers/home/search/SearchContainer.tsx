import * as React from 'react';
import Search from "../../../views/home/search/Search";

interface IProps {}
interface IState {}

class SearchContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Search/>
    );
  }
};

export default SearchContainer;
