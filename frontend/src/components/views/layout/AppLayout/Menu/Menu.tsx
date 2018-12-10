import * as React from "react";
import {
  Container, Icon, Label,
  Menu as SemanticMenu, Popup, Search
} from 'semantic-ui-react';
import CartState from "../../../../../states/CartState";
import {Route} from "react-router-dom";
import WishlistState from "../../../../../states/WishlistState";

import LoginPopupContent from "./LoginPopupContent";
import UserState from "../../../../../states/UserState";
import AccountPopupContent from "./AccountPopupContent";
import WishlistPopupContent from "./WishlistPopupContent";
import CartPopupContent from "./CartPopupContent";
import {Subscribe} from "unstated";
import {userState} from "src";

interface IProps {
}

interface IState {

}

class Menu extends React.Component<IProps, IState> {
  public state = {
    ShoppingCartButton: false,
    WishlistButton: false,
  };

  public toggleShoppingCart = () => {
    this.setState({
      ShoppingCartButton: !this.state.ShoppingCartButton,
      WishlistButton: false
    })
  };

  public toggleWishlist = () => {
    this.setState({
      WishlistButton: !this.state.WishlistButton,
      ShoppingCartButton: false
    })
  };

  // public setStateShoppingCartButton =() => {
  //   this.setState({WishlistButton: false, ShoppingCartButton: true})
  // }
  // public setStateWishListButton =() => {
  //   this.setState({ShoppingCartButton: false, WishlistButton: true})
  // }

  public render() {
    return (
      <div className="ui menu" style={{marginBottom: 25}}>
        <SemanticMenu fixed="top" borderless fluid>
          <Container>
            <Route render={({history}) => (
              <SemanticMenu.Item header onClick={() => history.push("/home/explore")}>
                Marshmallow's Webshop
              </SemanticMenu.Item>
            )}/>
            <div style={{ flex: 1 }}>
              <SemanticMenu.Item header>
                <Search />
              </SemanticMenu.Item>
            </div>
            <Subscribe to={[WishlistState, UserState]}>{this.renderWishlistMenuItem}</Subscribe>
            <Subscribe to={[CartState]}>{this.renderShoppingCartMenuItem}</Subscribe>
            <Subscribe to={[UserState]}>{this.renderLoginAccountMenuItem}</Subscribe>
          </Container>
        </SemanticMenu>
      </div>
    );
  }

  private renderLoginAccountMenuItem = () => {
    let menuContent = null;
    let popupContent = null;
    if (userState.state.user === null) {
      menuContent = (
        <>
          <Icon name="user"/>
          Login
          <Icon name="caret down"/>
        </>
      );
      popupContent = <LoginPopupContent/>;
    } else {
      menuContent = (
        <>
          <Icon name="user"/>
          {userState.state.user!.email}
          <Icon name="caret down"/>
        </>
      );
      popupContent = <AccountPopupContent/>;
    }
    return (
      <Popup
        basic
        hideOnScroll
        on="click"
        trigger={
          <SemanticMenu.Item header as="a">
            {menuContent}
          </SemanticMenu.Item>
        }
        content={popupContent}
      />
    );
  };

  private renderWishlistMenuItem = (wishlistState: WishlistState, loggedIn: UserState) => {
    return (
      <Popup
        basic
        hideOnScroll
        on="click"
        open={this.state.WishlistButton && !this.state.ShoppingCartButton}
        onOpen={this.toggleWishlist}
        onClose={this.toggleWishlist}
        trigger={
          <SemanticMenu.Item header as="a">
            <div style={{marginTop: 5}}>
              <Label.Group circular>
                <Icon name="heart"/>
                <span style={{marginRight: 5}}>Wishlist</span>
                <Label>{wishlistState.state.products.length}</Label>
              </Label.Group>
            </div>
          </SemanticMenu.Item>
        }
        content={<WishlistPopupContent/>}
      />
    )
  };

  private renderShoppingCartMenuItem = (cartState: CartState) => (
    <Popup
      basic
      hideOnScroll
      on="click"
      open={this.state.ShoppingCartButton && !this.state.WishlistButton}
      onOpen={this.toggleShoppingCart}
      onClose={this.toggleShoppingCart}
      trigger={
        <SemanticMenu.Item header as="a">
          <div style={{marginTop: 5}}>
            <Label.Group circular>
              <Icon name="cart"/>
              <span style={{marginRight: 5}}>Cart</span>
              <Label>{cartState.state.products.length}</Label>
            </Label.Group>
          </div>
        </SemanticMenu.Item>
      }
      content={<CartPopupContent/>}
    />
  );
}

export default Menu;
