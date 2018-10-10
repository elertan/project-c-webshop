import * as React from 'react';
import {
  Badge,
  IconButton, Input,
  Toolbar as MUIToolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  AccountCircle as AccountIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon
} from "@material-ui/icons";
import appIcon from "../../../../../img/app-icon.jpg";
import styles, {StyleProps} from "./ToolbarStyle";

interface IProps extends StyleProps {}

class Toolbar extends React.Component<IProps> {
  public render() {
    const classes = this.props.classes!;

    return (
      <MUIToolbar>
        <img src={appIcon} className={classes.appIcon} />
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
      </MUIToolbar>
    );
  }
};

export default withStyles(styles)(Toolbar);
