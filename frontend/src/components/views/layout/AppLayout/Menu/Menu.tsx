import * as React from "react";
import {
  Container, Icon, Label,
  Menu as SemanticMenu, Popup, Search, Button, ListItem, ListContent, List, ListHeader
} from 'semantic-ui-react';
import {Subscribe} from "unstated";
import CartState from "../../../../../states/CartState";
import IProduct from "../../../../../models/IProduct";
import {NavLink} from "react-router-dom";
import WishlistState from "../../../../../states/WishlistState";
import ITrack from "../../../../../models/ITrack";
import LoginPopupContent from "./LoginPopupContent";

interface IProps {
}

interface IState {
}

class Menu extends React.Component<IProps, IState> {
  // public authentication(email: string, password: string) {
  //   console.log(
  //     "Method werkt email = " +
  //       document.getElementById("email") +
  //       " wachtwood = " +
  //       document.getElementById("password")
  //   );
  //   return "hello";
  // }
  public state = {};

  public removeProductFromShoppingCart = (cartState: CartState, product: IProduct) => () => {
    // VRAAG!! Vanuit hier wil ik de megegeven product uit de cartstate list halen.

  }

  public render() {
    return (
      <div style={{marginBottom: 65}}>
        <SemanticMenu fixed="top">
          <Container>
            <NavLink to={"/"}>
              <SemanticMenu.Item header>
                Marshmallow's Webshop
              </SemanticMenu.Item>
            </NavLink>
            <SemanticMenu.Item header>
              <Search fluid/>
            </SemanticMenu.Item>

            <Popup
              basic
              hideOnScroll
              on="click"
              trigger={
                <SemanticMenu.Item header position="right" as="a">
                  <Icon name="sign-in"/>
                  My Marshmallow
                </SemanticMenu.Item>
              }
              content={<LoginPopupContent/>}
            />

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
                              );
                            }
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
                        <Icon name="cart"/>
                        <Label>{cartState.state.products.length}</Label>
                      </Label.Group>
                    </SemanticMenu.Item>
                  }
                  content={
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
                      {/* <button>Checkout</button> */}
                    </div>
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
    wishlistState.setState({products: newProducts});
  };
  private handleWishlistBuyItem = (
    cartState: WishlistState,
    track: ITrack,
    productId: number
  ) => () => {
    const product: IProduct = {
      id: productId,
      track
    };
    cartState.setState({products: [...cartState.state.products, product]});
  };
}

export default Menu;
