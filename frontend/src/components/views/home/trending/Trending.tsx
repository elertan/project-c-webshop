import * as React from "react";

import AppLayout from "../../layout/AppLayout/AppLayout";
import {
  List,
  ListHeader,
  ListItem,
  ListContent,
  Button
} from "semantic-ui-react";
import IProduct from "src/models/IProduct";

import { Subscribe } from "unstated";
import CartState from "src/states/CartState";

interface IProps {}

class Explore extends React.Component<IProps> {
  public render() {
    return (
      <AppLayout>
        <Subscribe to={[CartState]}>
          {(cartState: CartState) => (
            <Subscribe to={[CartState]}>
              {(carttState: CartState) => (
                <List divided>
                  <ListHeader as="h1">Shopping cart</ListHeader>
                  {carttState.state.products.map(
                    (product: IProduct, i: number) => {
                      if (product.album !== undefined) {
                        return (
                          <ListItem key={i}>
                            <ListContent verticalAlign="middle">
                              {" "}
                              <ListHeader>
                                Album: {product.album!.name}
                              </ListHeader>
                              <ListContent verticalAlign="middle">
                                <Button
                                  floated="right"
                                  basic
                                  icon="trash"
                                  onClick={this.handleCartDeleteItem(
                                    cartState,
                                    product
                                  )}
                                />
                              </ListContent>
                            </ListContent>
                          </ListItem>
                        );
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
                              onClick={this.handleCartDeleteItem(
                                cartState,
                                product
                              )}
                            />
                          </ListContent>
                        </ListItem>
                      );
                    }
                  )}
                  <ListItem>
                    <div style={{ marginTop: 60 }}>
                      <Button color="green" floated="right">
                        Proceed to checkout
                      </Button>
                    </div>
                  </ListItem>
                </List>
              )}
            </Subscribe>
          )}
        </Subscribe>
      </AppLayout>
    );
  }
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

export default Explore;
