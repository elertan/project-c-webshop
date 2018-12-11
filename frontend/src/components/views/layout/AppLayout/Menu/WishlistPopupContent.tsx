import * as React from 'react';
import {Icon, List, Image} from "semantic-ui-react";
import IProduct from "../../../../../models/IProduct";
import {Subscribe} from "unstated";
import WishlistState from "../../../../../states/WishlistState";
import {wishlistState} from "../../../../../index";

interface IProps {
}

interface IState {
}

class WishlistPopupContent extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Subscribe to={[WishlistState]}>
        {this.renderWithWishlistState}
      </Subscribe>
    );
  }

  private renderWithWishlistState = (state: WishlistState) => {
    return (
      state.state.products.length === 0 ?
        this.renderEmptyWishlist()
        :
        this.renderWishlistItems()
    );
  };

  private renderEmptyWishlist = () => {
    return (
      <div style={{
        width: 450,
        padding: 20
      }}>
        <h3 style={{textAlign: 'center'}}>
          You haven't added anything to the wishlist yet.
        </h3>
        <p style={{textAlign: 'center'}}>
          Add products by clicking on the <Icon name="heart" color="red"/> button.
        </p>
      </div>
    );
  };

  private renderWishlistItems = () => {
    return (
      <List>
        {wishlistState.state.products.map(
          (product: IProduct, i: number) => {
            if (product.album !== undefined) {
              return (
                <List.Item>
                  <Image avatar src={product.album.images.items[0].url} />
                  <List.Content>
                    <List.Header>{product.album.name}</List.Header>
                    <List.Description>
                      Album
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            }

            if (product.track !== undefined) {
              return (
                <List.Item>
                  <Image avatar src={product.track.images[0].url}/>
                  <List.Content>
                    <List.Header>{product.track.title}</List.Header>
                    <List.Description>
                      Track
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            }
            return console.error("An unexpected item has been tried to add to the Wish list.");
          }
        )}
      </List>
    );
  };
}

export default WishlistPopupContent;
