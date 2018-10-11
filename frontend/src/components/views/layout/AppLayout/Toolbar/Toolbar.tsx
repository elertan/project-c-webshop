import * as React from 'react';
import {
  Badge,
  IconButton,
  Toolbar as MUIToolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  AccountCircle as AccountIcon,
  ShoppingCart as ShoppingCartIcon
} from "@material-ui/icons";
import appIcon from "../../../../../img/app-icon.jpg";
import styles, {StyleProps} from "./ToolbarStyle";
import Search from "./Search/Search";

interface IProps extends StyleProps {
}

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
        <Search />
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
