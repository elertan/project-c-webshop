import * as React from 'react';
import {Button, Icon, List, ListContent, ListItem} from "semantic-ui-react";
import IProduct from "../../../../../models/IProduct";
import CartState from "../../../../../states/CartState";
import {Subscribe} from "unstated";
import {Link, Route} from "react-router-dom";

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
        <div style={{ width: 450, padding: 20 }}>
          <h3 style={{ textAlign: 'center' }}>
            You haven't added anything to the cart yet.
          </h3>
          <p style={{ textAlign: 'center' }}>
            Add products by clicking on the <Icon name="shopping cart" color="black" /> button.
          </p>
        </div>
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
        <Route render={({history}) => (
          <Button fluid onClick={() => history.push("/shoppingcart")}>Checkout</Button>
        )} />
      </div>
    );
  };
};

export default CartPopupContent;
