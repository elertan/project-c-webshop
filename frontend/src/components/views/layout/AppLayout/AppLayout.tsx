// See this page for a reference https://material-ui.com/demos/app-bar/#app-bar-with-a-primary-search-field

import * as React from 'react';
import {
  AppBar,
  Drawer,
  withStyles
} from "@material-ui/core";
import styles, {StyleProps} from "./AppLayoutStyle";
import AppLayoutDrawer from "./Drawer/AppLayoutDrawer";
import Toolbar from "./Toolbar/Toolbar";

interface IProps extends React.HTMLProps<HTMLMainElement>, StyleProps {
}

class AppLayout extends React.Component<IProps> {
  public render() {
    const classes = this.props.classes!;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar />
        </AppBar>
        <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
          <AppLayoutDrawer />
        </Drawer>
        <main className={classes.content} {...this.props} />
      </div>
    );
  }
};

export default withStyles(styles)(AppLayout);
