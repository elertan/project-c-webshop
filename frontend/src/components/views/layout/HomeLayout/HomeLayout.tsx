// See this page for a reference https://material-ui.com/demos/app-bar/#app-bar-with-a-primary-search-field

import * as React from 'react';
import {
  AppBar, Badge,
  Drawer, IconButton, Input,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  AccountCircle as AccountIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon
} from "@material-ui/icons";
import styles, {StyleProps} from "./HomeLayoutStyle";
import HomeLayoutDrawer from "./Drawer/HomeLayoutDrawer";

interface IProps extends React.HTMLProps<HTMLMainElement>, StyleProps {
}

class HomeLayout extends React.Component<IProps> {
  public render() {
    const classes = this.props.classes!;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <img src="/favicon.ico" className={classes.appIcon} />
            <Typography
              variant="title"
              color="inherit"
              noWrap
              className={classes.appBarTitle}
            >Flying Marshmallows's Webshop</Typography>
            <div className={classes.grow}/>
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
              />
            </div>
            <div className={classes.grow}/>
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge className={classes.margin} badgeContent={2} color="secondary">
                  <ShoppingCartIcon/>
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={true /*isMenuOpen*/ ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={/*this.handleProfileMenuOpen*/undefined}
                color="inherit"
              >
                <AccountIcon/>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
          <HomeLayoutDrawer />
        </Drawer>
        <main className={classes.content} {...this.props} />
      </div>
    );
  }
};

export default withStyles(styles)(HomeLayout);
