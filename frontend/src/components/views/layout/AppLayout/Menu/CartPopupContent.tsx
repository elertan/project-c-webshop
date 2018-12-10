import * as React from 'react';
import {Button, List, ListContent, ListItem} from "semantic-ui-react";
import IProduct from "../../../../../models/IProduct";
import CartState from "../../../../../states/CartState";
import {Subscribe} from "unstated";
import {Link, NavLink} from "react-router-dom";

interface IProps {
}

class CartPopupContent extends React.Component<IProps> {
  public render() {
    return (
      <Subscribe to={[CartState]}>
        {this.renderCartState}
      </Subscribe>
    );
  }

  private renderCartState = (cartState: CartState) => {
    if (cartState.state.products.length === 0) {
      return (
        <p>Nothing has been added to the cart</p>
      );
    }

    return (
      <div>
        <List>
          {cartState.state.products.map((product: IProduct, i) => {
            if (product.album !== undefined) {
              return (
                <ListItem key={i}>
                  <ListContent verticalAlign="middle">
                    <Link to={`/album/${product.album!.id}`}>
                      {" "}
                      Album: {product.album!.name}
                    </Link>
                  </ListContent>
                  <ListContent verticalAlign="middle">
                    <Button
                      floated="right"
                      basic
                      icon="trash"
                      onClick={() => cartState.removeFromCart(product.id)}
                    />
                  </ListContent>
                </ListItem>
              );
            }

            if (product.track !== undefined) {
              return (
                <ListItem key={i}>
                  <ListContent verticalAlign="middle">
                    {" "}
                    Track: {product.track!.title}
                  </ListContent>
                  <ListContent verticalAlign="middle">
                    <Button
                      floated="right"
                      basic
                      icon="trash"
                      onClick={() => cartState.removeFromCart(product.id)}
                    />
                  </ListContent>
                </ListItem>
              );
            }
            return console.error("An unexpected item has been tried to add to the shopping cart.");
          })}
        </List>
        <Button positive floated="right"><NavLink to={"/shoppingcart"}>Checkout</NavLink></Button>
      </div>
    );
  };
};

export default CartPopupContent;
