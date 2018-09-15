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

class HomeLayoutDrawer extends React.Component<IProps> {
  public render() {
    return (
      <>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <ExploreIcon/>
            </ListItemIcon>
            <ListItemText primary="Explore"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TrendingIcon/>
            </ListItemIcon>
            <ListItemText primary="Trending"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AlbumsIcon/>
            </ListItemIcon>
            <ListItemText primary="Albums"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ArtistsIcon/>
            </ListItemIcon>
            <ListItemText primary="Artists"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GenresIcon/>
            </ListItemIcon>
            <ListItemText primary="Genres"/>
          </ListItem>
        </List>
        <List
          component="nav"
          subheader={<ListSubheader component="div">My Marshmellow</ListSubheader>}
        >
          <ListItem button>
            <ListItemIcon>
              <MyAlbumsIcon/>
            </ListItemIcon>
            <ListItemText primary="My Albums"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FavoritesIcon/>
            </ListItemIcon>
            <ListItemText primary="Favorites"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WishlistIcon/>
            </ListItemIcon>
            <ListItemText primary="Wishlist"/>
          </ListItem>
        </List><List
          component="nav"
          subheader={<ListSubheader component="div">History</ListSubheader>}
        >
          <ListItem button>
            <ListItemIcon>
              <RecentlyVisitedIcon/>
            </ListItemIcon>
            <ListItemText primary="Recently Visited"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <OrderHistoryIcon/>
            </ListItemIcon>
            <ListItemText primary="Order History"/>
          </ListItem>
        </List>
      </>
    );
  }
};

export default HomeLayoutDrawer;
