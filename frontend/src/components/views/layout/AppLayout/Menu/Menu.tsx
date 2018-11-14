import * as React from "react";
import {
  Container,
  Icon,
  Label,
  Input,
  Button,
  Divider,
  Menu as SemanticMenu,
  Popup,
  Search
} from "semantic-ui-react";
import { Subscribe } from "unstated";
import CartState from "../../../../../states/CartState";
import IProduct from "../../../../../models/IProduct";
// import {NavLink} from "react-router-dom";

interface IProps {}

interface IState {}

class Menu extends React.Component<IProps, IState> {
  public authentication(email:string, password:string) {
    console.log("Method werkt email = " + document.getElementById("email") + " wachtwood = " + document.getElementById("password"))
    return "hello"
  }
  public state = {
    
  };

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
            {/* <SemanticMenu.Item header position="right" as="a"> */}

            <Popup
              basic
              hideOnScroll
              on="click"
              trigger={
                <SemanticMenu.Item header position="right" as="a">
                  <Icon name="sign-in" />
                  Log In
                </SemanticMenu.Item>
              }
              content={
                <div>
                  <h4>E-mail</h4>
                  <Input id="email"
                    transparent
                    inline
                    size="large"
                    placeholder="voorbeeld@voorbeeld.nl"
                  />
                  <Divider />
                  <h4>Wachtwoord</h4>
                  <Input id="password"
                    transparent
                    inline
                    size="large"
                    type="password"
                    placeholder="Wachtwoord"
                  />
                  <Divider />
                  <Button primary onClick={
                    this.authentication(document.getElementById("email").toString(), document.getElementById("password").toString())
                  }
                    >Login</Button>
                  <Button secondary>Registreer</Button>
                </div>
              }
            />
            {/* </SemanticMenu.Item> */}
            {/*</NavLink>*/}
            <SemanticMenu.Item header as="a">
              Wishlist
            </SemanticMenu.Item>

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
                    <ul>
                      {cartState.state.products.map((product: IProduct, i) => (
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

}

export default Menu;
