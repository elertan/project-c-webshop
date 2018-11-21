import * as React from 'react';
import {Button, List, ListContent, ListHeader, ListItem} from "semantic-ui-react";
import IProduct from "../../../../../models/IProduct";
import CartState from "../../../../../states/CartState";
import {Subscribe} from "unstated";
import WishlistState from "../../../../../states/WishlistState";
import ITrack from "../../../../../models/ITrack";
import {cartState, wishlistState} from "../../../../../index";
import {Link} from "react-router-dom";
import IAlbum from "../../../../../models/IAlbum";

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
        {wishlistState.state.products.map(
          (product: IProduct, i: number) => {
            if (product.album !== undefined) {
              return (
                <ListItem key={i}>
                  <ListContent verticalAlign="middle">
                    <Link to={`/album/${product.album!.id}`} >
                      {" "}
                      Album: {product.album!.name}
                    </Link>
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
                      onClick={this.handleWishlistAddAlbum(product.album!, product.id)}
                    />
                  </ListContent>
                </ListItem>
              )
            }

            if (product.track !== undefined) {
              return (
                <ListItem key={i}>
                  <ListContent verticalAlign="middle">
                    {" "}
                    <ListHeader>
                      Track: {product.track!.title}
                    </ListHeader>
                    <Link to={`/album/${product.track!.albumId}`} >
                      Album: {product.track!.albumsName}
                    </Link>
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
                      onClick={this.handleWishlistAddTrack(product.track!, product.track!.id)}
                    />
                  </ListContent>
                </ListItem>
              );
            }
            return console.error("An unexpected item has been tried to add to the Wish list.");
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

  private handleWishlistAddTrack = (track: ITrack, productId: number) => () => {
    const product: IProduct = {
      id: productId,
      track
    };
    cartState.setState({products: [...cartState.state.products, product]});
  };

  private handleWishlistAddAlbum = (album: IAlbum, productId: number) => () => {
    const product: IProduct = {
      id: productId,
      album
    };
    cartState.setState({products: [...cartState.state.products, product]});
  };
}

export default WishlistPopupContent;
