import * as React from 'react';
import {List, ListItem, ListItemIcon, ListItemText, ListSubheader} from "@material-ui/core";
import {
  Explore as ExploreIcon,
  TrendingUp as TrendingIcon,
  Album as AlbumsIcon,
  People as ArtistsIcon,
  Loyalty as GenresIcon,
  ViewModule as MyAlbumsIcon,
  Favorite as FavoritesIcon,
  List as WishlistIcon,
  History as RecentlyVisitedIcon,
  CreditCard as OrderHistoryIcon
} from '@material-ui/icons';
import {NavLink} from "react-router-dom";

interface IProps {
}

interface IMenuItemData {
  label: string;
  icon: React.ComponentType<any>;
  url: string;
}

const mainMenuItems: IMenuItemData[] = [
  {
    label: "Explore",
    icon: ExploreIcon,
    url: "/home/explore"
  },
  {
    label: "Trending",
    icon: TrendingIcon,
    url: "/home/trending"
  },
  {
    label: "Albums",
    icon: AlbumsIcon,
    url: "/home/albums"
  },
  {
    label: "Artists",
    icon: ArtistsIcon,
    url: "/home/artists"
  },
  {
    label: "Genres",
    icon: GenresIcon,
    url: "/home/genres"
  },
];

const myMarshmellowMenuItems: IMenuItemData[] = [
  {
    label: "My Albums",
    icon: MyAlbumsIcon,
    url: "/home/my-albums"
  },
  {
    label: "Favorites",
    icon: FavoritesIcon,
    url: "/home/favorites"
  },
  {
    label: "Wishlist",
    icon: WishlistIcon,
    url: "/home/wishlist"
  },
];

const historyMenuItems: IMenuItemData[] = [
  {
    label: "Recently Visited",
    icon: RecentlyVisitedIcon,
    url: "/home/recently-visited"
  },
  {
    label: "Order History",
    icon: OrderHistoryIcon,
    url: "/home/order-history"
  },
];

class HomeLayoutDrawer extends React.Component<IProps> {
  public render() {
    return (
      <>
        <List component="nav">
          {this.renderListItems(mainMenuItems)}
        </List>
        <List
          component="nav"
          subheader={<ListSubheader component="div">My Marshmellow</ListSubheader>}
        >
          {this.renderListItems(myMarshmellowMenuItems)}
        </List>
        <List
          component="nav"
          subheader={<ListSubheader component="div">History</ListSubheader>}
        >
          {this.renderListItems(historyMenuItems)}
        </List>
      </>
    );
  }

  private renderListItems = (items: IMenuItemData[]) =>
    items.map((item, i) => (
      <NavLink
        key={i}
        to={item.url}
        activeStyle={{ backgroundColor: 'lightgray' }}
        style={{ display: 'block', textDecoration: 'none' }}
      >
        <ListItem button>
          <ListItemIcon>
            <item.icon/>
          </ListItemIcon>
          <ListItemText primary={item.label}/>
        </ListItem>
      </NavLink>
    ));
};

export default HomeLayoutDrawer;
