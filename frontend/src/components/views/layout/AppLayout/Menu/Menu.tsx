import * as React from 'react';
import {
  Container,
  Menu as SemanticMenu, Search
} from 'semantic-ui-react';
// import {NavLink} from "react-router-dom";

interface IProps {
}

interface IState {
}

class Menu extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <div style={{ marginBottom: 65 }}>
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
            <SemanticMenu.Item header as="a">
              Shopping Cart
            </SemanticMenu.Item>
          </Container>
        </SemanticMenu>
      </div>
    );
  }
};

export default Menu;
