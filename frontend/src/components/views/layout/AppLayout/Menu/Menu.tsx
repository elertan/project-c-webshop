import * as React from "react";
import {
  Container, Icon, Label,
  Menu as SemanticMenu, Popup
} from 'semantic-ui-react';
import CartState from "../../../../../states/CartState";
import {Route, RouteComponentProps, withRouter} from "react-router-dom";
import WishlistState from "../../../../../states/WishlistState";

import LoginPopupContent from "./LoginPopupContent";
import UserState from "../../../../../states/UserState";
import AccountPopupContent from "./AccountPopupContent";
import WishlistPopupContent from "./WishlistPopupContent";
import CartPopupContent from "./CartPopupContent";
import {Subscribe} from "unstated";
import {userState} from "src";
import CustomSearch from "./CustomSearch";
import IUser from "../../../../../models/IUser";

interface IProps {
}

interface IState {
  shoppingCartOpen: boolean;
  wishlistOpen: boolean;
  loginAccountOpen: boolean;
  authorize: string | null;
}

type Props = IProps & RouteComponentProps<{}>;

class Menu extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);

    const params = new URLSearchParams(props.location.search);
    const authorize = params.get('authorize');

    this.state = {
      shoppingCartOpen: false,
      wishlistOpen: false,
      loginAccountOpen: false,
      authorize
    };
  }

  public componentDidMount(): void {
    if (this.state.authorize !== null) {
      setTimeout(() => this.setState({loginAccountOpen: true}), 300);
    }
  }

  public toggleShoppingCart = () => {
    this.setState({
      shoppingCartOpen: !this.state.shoppingCartOpen,
      wishlistOpen: false,
      loginAccountOpen: false
    });
  };

  public toggleWishlist = () => {
    this.setState({
      wishlistOpen: !this.state.wishlistOpen,
      shoppingCartOpen: false,
      loginAccountOpen: false
    });
  };

  private toggleLoginAccount = () => {
    this.setState({
      wishlistOpen: false,
      shoppingCartOpen: false,
      loginAccountOpen: !this.state.loginAccountOpen
    });
  };

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
            <div style={{flex: 1}}>
              <SemanticMenu.Item header>
                <CustomSearch/>
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
    const user = userState.state.user! as IUser;
    if (user === null) {
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
          {user!.firstname} {user!.lastname}
          <Icon name="caret down" style={{marginLeft: 5}}/>
        </>
      );
      popupContent = <AccountPopupContent/>;
    }
    return (
      <Popup
        basic
        hideOnScroll
        on="click"
        open={this.state.loginAccountOpen}
        onOpen={this.toggleLoginAccount}
        onClose={this.toggleLoginAccount}
        trigger={
          <SemanticMenu.Item header as="a">
            {menuContent}
          </SemanticMenu.Item>
        }
        content={
          <div>
            {popupContent}
            {user === null && this.state.authorize !== null &&
            <p style={{ margin: 10, color: 'red', textAlign: 'center' }}>Please authorize to continue...</p>
            }
            {user !== null && this.state.authorize === "admin" && !user.isAdmin &&
            <p style={{ margin: 10, color: 'red', textAlign: 'center' }}>You need administrative priveleges to access that area.</p>
            }
          </div>
        }
      />
    );
  };

  private renderWishlistMenuItem = (wishlistState: WishlistState, loggedIn: UserState) => {
    return (
      <Popup
        basic
        hideOnScroll
        on="click"
        open={this.state.wishlistOpen}
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
      open={this.state.shoppingCartOpen}
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

export default withRouter(Menu);
