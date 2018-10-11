import * as React from 'react';
import {Typography} from "@material-ui/core";

interface IProps {
  query: string;
}
interface IState {}

class SearchResult extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <div>
        <Typography
          variant="display2"
        >
          Search results for: '{this.props.query}'
        </Typography>
        <div>
          I AM SUPPOSED TO BE RESULTS
        </div>
      </div>
    );
  }
};

export default SearchResult;
