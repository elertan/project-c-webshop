import * as React from 'react';
import Search from "../../../views/home/search/Search";
import AppLayout from "../../../views/layout/AppLayout/AppLayout";
import {RouteComponentProps} from "react-router";
import * as queryString from "query-string";

interface IRouteProps {

}

interface IProps extends RouteComponentProps<IRouteProps> {}
interface IState {
  query?: string;
}

class SearchContainer extends React.Component<IProps, IState> {
  public state = {
    query: undefined
  };

  public componentDidMount() {
    this.parseQueryString();
  }

  public componentDidUpdate(prevProps: IProps) {
    // Query string changed
    if (this.props.location.search !== prevProps.location.search) {
      this.parseQueryString();
    }
  }

  public render() {
    return (
      <AppLayout>
        <Search query={this.state.query} />
      </AppLayout>
    );
  }

  private parseQueryString = () => {
    const values = queryString.parse(this.props.location.search);
    // Query parameter given to route
    if (values.q !== undefined) {
      this.setState({ query: values.q });
    } else if (this.state.query !== undefined) {
      this.setState({ query: undefined });
    }
  };
};

export default SearchContainer;
