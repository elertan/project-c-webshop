import * as React from 'react';
import {Button, List, ListContent, ListHeader, ListItem} from "semantic-ui-react";
import IProduct from "../../../../../models/IProduct";
import CartState from "../../../../../states/CartState";
import {Subscribe} from "unstated";
import WishlistState from "../../../../../states/WishlistState";
import ITrack from "../../../../../models/ITrack";
import {cartState, wishlistState} from "../../../../../index";

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

  private renderWithWishlistState = (state: CartState) => {
    return (
      <List divided>
        {state.state.products.map(
          (product: IProduct, i: number) => {
            if (product.album !== undefined) {
              return <ListItem>album not implemented</ListItem>
            }
            return (
              <ListItem key={i}>
                <ListContent verticalAlign="middle">
                  {" "}
                  <ListHeader>
                    Track: {product.track!.title}
                  </ListHeader>
                  Album: {product.track!.albumsName}
                </ListContent>
                <ListContent verticalAlign="middle">
                  <Button
                    floated="right"
                    basic
                    icon="trash"
                    onClick={this.handleWishlistRemoveItem(product)}
                  />
                  <Button
                    floated="right"
                    basic
                    icon="shopping basket"
                    onClick={this.handleWishlistAddItem(product.track!, product.track!.id)}
                  />
                </ListContent>
              </ListItem>
            );
          }
        )}
      </List>
    );
  };

  private handleWishlistRemoveItem = (product: IProduct) => () => {
    const newProducts = wishlistState.state.products.filter(
      (p: IProduct) => p.id !== product.id
    );
    wishlistState.setState({products: newProducts});
  };

  private handleWishlistAddItem = (track: ITrack, productId: number) => () => {
    const product: IProduct = {
      id: productId,
      track
    };
    cartState.setState({products: [...cartState.state.products, product]});
  };
}

export default WishlistPopupContent;
