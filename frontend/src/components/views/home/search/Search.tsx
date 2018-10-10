import * as React from 'react';

interface IProps {
  query?: string;
}
interface IState {}

class Search extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <div>Search: {this.props.query}</div>
    );
  }
};

export default Search;
