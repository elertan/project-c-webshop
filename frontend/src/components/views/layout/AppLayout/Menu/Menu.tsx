import * as React from "react";
import {
  Container, Icon, Label,
  Menu as SemanticMenu, Popup, Search
} from 'semantic-ui-react';
import {Subscribe} from "unstated";
import CartState from "../../../../../states/CartState";
import IProduct from "../../../../../models/IProduct";
import {NavLink} from "react-router-dom";
import WishlistState from "../../../../../states/WishlistState";
import LoginPopupContent from "./LoginPopupContent";
import UserState from "../../../../../states/UserState";
import AccountPopupContent from "./AccountPopupContent";
import WishlistPopupContent from "./WishlistPopupContent";
import CartPopupContent from "./CartPopupContent";

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

            <Subscribe to={[UserState]}>
              {(userState: UserState) => {
                let menuContent = null;
                let popupContent = null;
                if (userState.state.user === null) {
                  menuContent = (
                    <>
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
              }}
            </Subscribe>

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
                  content={<WishlistPopupContent/>}
                />
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
                  content={<CartPopupContent/>}
                />
              )}
            </Subscribe>
          </Container>
        </SemanticMenu>
      </div>
    );
  }

}

export default Menu;
