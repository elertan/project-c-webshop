import * as React from "react";
import {
  Container,
  Icon,
  Label,
  Menu as SemanticMenu,
  Popup,
  Search,
  List,
  ListItem,
  Button,
  ListContent,
  ListHeader
} from "semantic-ui-react";
import { Subscribe } from "unstated";
import CartState from "../../../../../states/CartState";
import IProduct from "../../../../../models/IProduct";
import WishlistState from "../../../../../states/WishlistState";

import { ITrackData } from "src/components/views/reusable/TrackRow/TrackRow";


// import {NavLink} from "react-router-dom";

interface IProps {}

interface IState {}

class Menu extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <div style={{ marginBottom: 65 }}>
        <SemanticMenu fixed="top">
          <Container>
            <SemanticMenu.Item as="a" header href="/">
              Marshmallow's Webshop
            </SemanticMenu.Item>
            <SemanticMenu.Item header>
              <Search fluid />
            </SemanticMenu.Item>
            {/*<NavLink to={"/auth/login"}>*/}
            <SemanticMenu.Item header position="right" as="a">
              Log In
            </SemanticMenu.Item>
            {/*</NavLink>*/}
            <Subscribe to={[CartState]}>
              {(cartState: CartState) => (
                <Subscribe to={[WishlistState]}>
                  {(wishlistState: WishlistState) => (
                    <Popup
                      basic
                      hideOnScroll
                      on="click"
                      trigger={
                        <SemanticMenu.Item header as="a">
                          <Label.Group circular>
                            Wishlist
                            <Label>{wishlistState.state.products.length}</Label>
                          </Label.Group>
                        </SemanticMenu.Item>
                      }
                      content={
                          <List divided>
                            {wishlistState.state.products.map(
                              (product: IProduct, i: number) => (
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
                                      onClick={this.handleWishlistDeleteItem(
                                        wishlistState,
                                        product
                                      )}
                                    />
                                    <Button
                                      floated="right"
                                      basic
                                      icon="shopping basket"
                                      onClick={this.handleWishlistBuyItem(
                                        cartState,
                                        product.track!,
                                        product.track!.id
                                      )}
                                    />
                                  </ListContent>
                                </ListItem>
                              )
                            )}
                          </List>
                      }
                    />
                  )}
                </Subscribe>
              )}
            </Subscribe>
            <Subscribe to={[CartState]}>
              {(cartState: CartState) => (
                <Popup
                  basic
                  hideOnScroll
                  on="click"
                  trigger={
                    <SemanticMenu.Item header as="a">
                      <Label.Group circular>
                        <Icon name="cart" />
                        <Label>{cartState.state.products.length}</Label>
                      </Label.Group>
                    </SemanticMenu.Item>
                  }
                  content={
                    <List divided>
                      {cartState.state.products.map(
                        (product: IProduct, i: number) => (
                          <ListItem key={i}>
                            <ListContent verticalAlign="middle">
                              {" "}
                              <ListHeader>
                                Track: {product.track!.title}
                              </ListHeader>
                              Album: {product.track!.albumsName}
                            </ListContent>
                          </ListItem>
                        )
                      )}
                    </List>
                  }
                />
              )}
            </Subscribe>
          </Container>
        </SemanticMenu>
      </div>
    );
  }

  private handleWishlistDeleteItem = (
    wishlistState: WishlistState,
    product: IProduct
  ) => () => {
    const newProducts = wishlistState.state.products.filter(
      (p: IProduct) => p.id !== product.id
    );
    wishlistState.setState({ products: newProducts });
  };
  private handleWishlistBuyItem = (
    cartState: WishlistState,
    track: ITrackData,
    productId: number
  ) => () => {
    const product: IProduct = {
      id: productId,
      track
    };
    cartState.setState({ products: [...cartState.state.products, product] });
  };
}

export default Menu;
