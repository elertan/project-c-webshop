import * as React from "react";

import AppLayout from "../../layout/AppLayout/AppLayout";
import {
  List,
  ListHeader,
  ListItem,
  ListContent,
  Button,
  Image
} from "semantic-ui-react";
import IProduct from "src/models/IProduct";

import { Subscribe } from "unstated";
import CartState from "src/states/CartState";
import { NavLink } from "react-router-dom";

// const styles = {
//   item: {
//     display: "flex",
//     flexdirection: "row"

//   }
// };

interface IProps {}

class Shoppingcart extends React.Component<IProps> {
  public render() {
    return <Subscribe to={[CartState]}>{this.renderShoppingCart}</Subscribe>;
  }

  private renderShoppingCart = (cartState: CartState) => {
    const totalPrice = cartState.state.products
      .map((x: IProduct) => x.price)
      .reduce((prev, curr) => prev + curr);

    const totalProducts = cartState.state.products.length;

    return (
      <AppLayout>
        <List divided>
          <ListHeader as="h1">Shopping cart</ListHeader>
          {cartState.state.products.map((product: IProduct, i: number) => {
            if (product.album !== undefined) {
              return (
                <ListItem key={i}>
                  <Image size="tiny" src={product.album.images.items[0].url} />
                  <ListContent verticalAlign="middle">
                    {" "}
                    <ListHeader>{product.album!.name}</ListHeader>
                    <ListContent>Album- ${product.price}</ListContent>
                  </ListContent>
                  <ListContent floated="right" verticalAlign="bottom">
                    <Button
                      floated="right"
                      basic
                      icon="trash"
                      onClick={this.handleCartDeleteItem(cartState, product)}
                    />
                  </ListContent>
                </ListItem>
              );
            }

            return (
              <ListItem key={i}>
                <Image size="tiny" src={product.track!.images[0].url} />
                <ListContent verticalAlign="middle">
                  {" "}
                  <ListHeader>Track: {product.track!.title}</ListHeader>
                  <ListContent>track- ${product.price}</ListContent>
                </ListContent>
                <ListContent floated="right" verticalAlign="bottom">
                  <Button
                    floated="right"
                    basic
                    icon="trash"
                    onClick={this.handleCartDeleteItem(cartState, product)}
                  />
                </ListContent>
              </ListItem>
            );
          })}
          <ListItem>
            <div style={{ marginTop: 40 }}>
              <ListContent floated="right">
                <div style={{ width: 300, height: 80 }}>
                  <div>
                    Total products
                    <ListContent floated="right">{totalProducts}</ListContent>
                    <hr />
                  </div>
                  Total
                  <ListContent floated="right">${totalPrice}</ListContent>
                </div>
              </ListContent>
            </div>
          </ListItem>
          <div>
            {" "}
            <NavLink to={"/shoppingcart/orderauth"}>
              <Button color="green" floated="right">
                Proceed to checkout
              </Button>
            </NavLink>{" "}
          </div>
        </List>
      </AppLayout>
    );
  };

  private handleCartDeleteItem = (
    cartState: CartState,
    product: IProduct
  ) => () => {
    const newProducts = cartState.state.products.filter(
      (p: IProduct) => p.id !== product.id
    );
    cartState.setState({ products: newProducts });
  };
}

export default Shoppingcart;
