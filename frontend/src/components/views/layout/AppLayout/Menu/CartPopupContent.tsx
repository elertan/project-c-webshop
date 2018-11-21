import * as React from 'react';
import {Button, List, ListContent, ListItem} from "semantic-ui-react";
import IProduct from "../../../../../models/IProduct";
import CartState from "../../../../../states/CartState";
import {Subscribe} from "unstated";
import {Link, NavLink} from "react-router-dom";

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
                        />
                      </ListContent>
                    </ListItem>
                  );
                }
                return console.error("An unexpected item has been tried to add to the shopping cart.");
              })}
            </List>
            <Button positive floated="right"><NavLink to={"/home/shoppingcart"}>Checkout</NavLink></Button>
          </div>
        )}
      </Subscribe>
    );
  }
};

export default CartPopupContent;
