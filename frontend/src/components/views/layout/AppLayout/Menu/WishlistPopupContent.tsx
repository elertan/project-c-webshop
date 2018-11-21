import * as React from 'react';
import {Button, List, ListContent, ListHeader, ListItem} from "semantic-ui-react";
import IProduct from "../../../../../models/IProduct";
import {Subscribe} from "unstated";
import WishlistState from "../../../../../states/WishlistState";
import {cartState, wishlistState} from "../../../../../index";
import {Link} from "react-router-dom";

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
                      onClick={() => state.removeFromWishlist(product.id)}
                    />
                    <Button
                      floated="right"
                      basic
                      icon="shopping basket"
                      onClick={() => cartState.addToCart({ album: product.album!, id: product.id })}
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
                      onClick={() => state.removeFromWishlist(product.id)}
                    />
                    <Button
                      floated="right"
                      basic
                      icon="shopping basket"
                      onClick={() => cartState.addToCart({ track: product.track!, id: product.track!.id })}
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
}

export default WishlistPopupContent;
