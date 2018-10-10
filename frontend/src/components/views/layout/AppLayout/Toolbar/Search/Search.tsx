import * as React from 'react';
import {Input, withStyles} from "@material-ui/core";
import {
  Search as SearchIcon,
} from "@material-ui/icons";
import styles, {StyleProps} from "./SearchStyle";
import { withRouter } from 'react-router-dom'
import {RouteComponentProps} from "react-router";

interface IProps extends StyleProps, RouteComponentProps<any> {
}
interface IState {
  value: string;
}

const searchDelay = 350;

class Search extends React.Component<IProps, IState> {
  public state = {
    value: '',
  };

  /* tslint:disable-next-line */
  private _timeoutId?: NodeJS.Timer;

  public render() {
    const classes = this.props.classes!;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon/>
        </div>
        <Input
          placeholder="Search…"
          disableUnderline
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }

  private isOnSearchPage = () => {
    const pathname = this.props.history.location.pathname;

    return pathname.includes('search');
  };

  private handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    this.handleSearch(value);
  };

  private handleSearch = (query: string) => {
    this.setState({ value: query });

    if (this._timeoutId !== undefined) {
      clearTimeout(this._timeoutId);
    }
    this._timeoutId = setTimeout(() => this.executeSearch(query), searchDelay);
  };

  private handleFocus = () => {
    if (!this.isOnSearchPage()) {
      this.props.history.push('/home/search');
    }
  };

  private handleBlur = () => {
    this.setState({ value: '' });
  };

  private executeSearch = (query: string) => {
    this.props.history.push(`/home/search?q=${encodeURI(query)}`);
  };

}

export default withRouter(withStyles(styles)(Search));
