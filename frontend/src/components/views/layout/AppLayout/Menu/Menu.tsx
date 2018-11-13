import * as React from 'react';
import {
  Container, Icon, Label,
  Menu as SemanticMenu, Popup, Search
} from 'semantic-ui-react';
import {Subscribe} from "unstated";
import CartState from "../../../../../states/CartState";
import IProduct from "../../../../../models/IProduct";

// import {NavLink} from "react-router-dom";

interface IProps {
}

interface IState {
}

class Menu extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <div style={{marginBottom: 65}}>
        <SemanticMenu
          fixed="top"
        >
          <Container>
            <SemanticMenu.Item
              as="a"
              header
              href="/"
            >
              Marshmallow's Webshop
            </SemanticMenu.Item>
            <SemanticMenu.Item header>
              <Search fluid/>
            </SemanticMenu.Item>
            {/*<NavLink to={"/auth/login"}>*/}
            <SemanticMenu.Item header position="right" as="a">
              Log In
            </SemanticMenu.Item>
            {/*</NavLink>*/}
            <SemanticMenu.Item header as="a">
              Wishlist
            </SemanticMenu.Item>
            <Subscribe to={[CartState]}>
              {(cartState: CartState) => (
                <Popup
                  basic
                  hideOnScroll
                  on='click'
                  trigger={
                    <SemanticMenu.Item header as="a">
                      <Label.Group circular>
                        <Icon name="cart"/>
                        <Label>{cartState.state.products.length}</Label>
                      </Label.Group>
                    </SemanticMenu.Item>
                  }
                  content={
                    <ul>
                      { cartState.state.products.map((product: IProduct, i) => (
                        <li key={i}>{product.album!.name}</li>
                      ))}
                    </ul>
                  }
                />
              )}
            </Subscribe>
          </Container>
        </SemanticMenu>
      </div>
    );
  }
};

export default Menu;
