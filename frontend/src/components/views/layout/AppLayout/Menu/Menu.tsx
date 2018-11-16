import * as React from 'react';
import {
  Container, Icon, Label,
  Menu as SemanticMenu, Popup, Search, Button
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

  public removeProductFromShoppingCart = (cartState: CartState, product: IProduct) => () => {
    product: _.omit(cartState.state.products, product)
    // cartState.state.products.forEach((stateProduct: IProduct) => {
    //   if (product.id == stateProduct.id) {
    //     stateProduct: _.omit(stateProduct);
    //   }
    // });

    // // VRAAG!! Vanuit hier wil ik het megegeven product uit de cartstate list halen.
    // console.log(cartState);
    // const mark = cartState.state.products.map((newProduct: IProduct) => () => {
    //   if (product.id == newProduct.id) {
    //     delete newProduct;
    //   }
    // })
  }

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
                    <div>
                      <ul>
                        { cartState.state.products.map((product: IProduct, i) => {
                          if (product.album !== undefined) {
                            return <div>
                              <li key={i}>{product.album!.name}</li>
                              <Button onClick={this.removeProductFromShoppingCart(cartState, product)}>x</Button>
                            </div>
                          }
                          
                          if (product.track !== undefined) {
                            return <div>
                              <li key={i}>{product.track!.name}</li>
                              {/* <Button onClick={this.removeProductFromShoppingCart(cartState, product)}>x</Button> */}
                            </div>
                          }
                          return console.error("An unexpected item has been tried to add to the shopping cart.");
                        })}
                      </ul>
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
};

export default Menu;
