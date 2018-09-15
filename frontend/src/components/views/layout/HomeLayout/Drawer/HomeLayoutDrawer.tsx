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

interface IProps {
}

interface IMenuItemData {
  label: string;
  icon: React.ComponentType<any>;
  onClick?: () => void;
}

const mainMenuItems: IMenuItemData[] = [
  {
    label: "Explore",
    icon: ExploreIcon
  },
  {
    label: "Trending",
    icon: TrendingIcon
  },
  {
    label: "Albums",
    icon: AlbumsIcon
  },
  {
    label: "Artists",
    icon: ArtistsIcon
  },
  {
    label: "Genres",
    icon: GenresIcon
  },
];

const myMarshmellowMenuItems: IMenuItemData[] = [
  {
    label: "My Albums",
    icon: MyAlbumsIcon
  },
  {
    label: "Favorites",
    icon: FavoritesIcon
  },
  {
    label: "Wishlist",
    icon: WishlistIcon
  },
];

const historyMenuItems: IMenuItemData[] = [
  {
    label: "Recently Visited",
    icon: RecentlyVisitedIcon
  },
  {
    label: "Order History",
    icon: OrderHistoryIcon
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
      <ListItem button key={i}>
        <ListItemIcon>
          <item.icon/>
        </ListItemIcon>
        <ListItemText primary={item.label}/>
      </ListItem>
    ));
};

export default HomeLayoutDrawer;
