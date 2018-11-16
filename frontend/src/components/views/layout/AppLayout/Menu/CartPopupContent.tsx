import * as React from 'react';
import {Button, List, ListItem} from "semantic-ui-react";
import IProduct from "../../../../../models/IProduct";
import CartState from "../../../../../states/CartState";
import {Subscribe} from "unstated";

interface IProps {
}

interface IState {
}

class CartPopupContent extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Subscribe to={[CartState]}>
        {(cartState: CartState) => (
          <div>
            <List>
              {cartState.state.products.map((product: IProduct, i) => {
                if (product.album !== undefined) {
                  return (
                    <ListItem key={i}>
                      {product.album!.name}
                    </ListItem>
                  );
                }

                if (product.track !== undefined) {
                  return (
                    <ListItem key={i}>
                      {product.track!.title}
                    </ListItem>
                  );
                }
                return console.error("An unexpected item has been tried to add to the shopping cart.");
              })}
            </List>
            <Button
              primary
            >Checkout</Button>
          </div>
        )}
      </Subscribe>
    );
  }
};

export default CartPopupContent;
