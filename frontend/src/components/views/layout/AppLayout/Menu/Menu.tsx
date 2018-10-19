import * as React from 'react';
import {
  Container,
  Menu as SemanticMenu, Search
} from 'semantic-ui-react';

interface IProps {}
interface IState {}

class Menu extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <div>
        <SemanticMenu
          fixed="top"
        >
          <Container>
            <SemanticMenu.Item
              as="a"
              header
            >
              Marshmallow's Webshop
            </SemanticMenu.Item>
            <SemanticMenu.Item header>
              <Search fluid />
            </SemanticMenu.Item>
            <SemanticMenu.Item header position="right">
              Log In
            </SemanticMenu.Item>
            <SemanticMenu.Item header>
              Wishlist
            </SemanticMenu.Item>
            <SemanticMenu.Item header>
              Shoppingcart
            </SemanticMenu.Item>
          </Container>
        </SemanticMenu>
      </div>
    );
  }
};

export default Menu;
