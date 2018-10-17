import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import PreSearch from "./PreSearch/PreSearch";
import SearchResult from "./SearchResult/SearchResult";

interface IProps {
  query?: string;
}
interface IState {}

class Search extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    if (this.props.query === undefined) {
      return (
        <AppLayout>
          <PreSearch/>
        </AppLayout>
      );
    }

    return (
      <AppLayout>
        <SearchResult query={this.props.query}/>
      </AppLayout>
    );
  }
};

export default Search;
