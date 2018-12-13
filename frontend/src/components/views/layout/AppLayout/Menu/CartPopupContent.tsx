import * as React from 'react';
import {Button, Icon, Image, List} from "semantic-ui-react";
import IProduct from "../../../../../models/IProduct";
import CartState from "../../../../../states/CartState";
import {Subscribe} from "unstated";
import {Route} from "react-router";
import BedragWaarde, {Valuta} from "../../../reusable/BedragWaarde";

interface IProps {
}

class CartPopupContent extends React.Component<IProps> {
  public render() {
    return (
      <Subscribe to={[CartState]}>
        {this.renderCartState}
      </Subscribe>
    );
  }

  private renderCartState = (cartState: CartState) => {
    if (cartState.state.products.length === 0) {
      return (
        <div style={{ width: 450, padding: 20 }}>
          <h3 style={{ textAlign: 'center' }}>
            You haven't added anything to the cart yet.
          </h3>
          <p style={{ textAlign: 'center' }}>
            Add products by clicking on the <Icon name="shopping cart" color="black" /> button.
          </p>
        </div>
      );
    }

    const totalPrice = cartState.state.products
      .map((x: IProduct) => x.price)
      .reduce((prev, curr) => prev + curr);

    return (
      <div style={{width: 450, padding: 20}}>
        <h3 style={{ textAlign: 'center', marginBottom: 25 }}>
          These are in your cart. <Icon name="check" color="black" />
        </h3>
        <List size="large" divided>
          {cartState.state.products.map(
            (product: IProduct, i: number) => {
              if (product.album !== undefined) {
                return (
                  <List.Item key={i}>
                    <Image size="mini" src={product.album.images.items[0].url}/>
                    <List.Content>
                      <List.Header>
                        {product.album.name}
                      </List.Header>
                      <List.Description>
                        Album - <BedragWaarde bedrag={product.price} toonMutatie={false} valuta={Valuta.Dollar} geenTeken />
                      </List.Description>
                    </List.Content>
                    <List.Content>
                      <div style={{ marginTop: 5, marginBottom: 5 }} />
                      <Button
                        size="small"
                        icon
                        onClick={() => cartState.removeFromCart(product.id)}
                      >
                        <Icon name="trash"/>
                      </Button>
                    </List.Content>
                  </List.Item>
                )
              }

              if (product.track !== undefined) {
                return (
                  <List.Item>
                    <Image size="mini" src={product.track.images[0].url}/>
                    <List.Content>
                      <List.Header>{product.track.title}</List.Header>
                      <List.Description>
                        Track - <BedragWaarde bedrag={product.price} toonMutatie={false} valuta={Valuta.Dollar} geenTeken />
                      </List.Description>
                    </List.Content>
                    <List.Content>
                      <div style={{ marginTop: 5, marginBottom: 5 }} />
                      <Button
                        size="small"
                        icon
                        onClick={() => cartState.removeFromCart(product.id)}
                      >
                        <Icon name="trash"/>
                      </Button>
                    </List.Content>
                  </List.Item>
                )
              }
              return console.error("An unexpected item has been tried to add to the Wish list.");
            }
          )}
        </List>
        <h3>Total price: <BedragWaarde bedrag={totalPrice} valuta={Valuta.Dollar} toonMutatie={false} fontSize={21} geenTeken/></h3>
        <Route render={({ history }) => (
          <Button
            onClick={() => history.push("/shoppingcart/order")}
            fluid
          >
            Proceed with order
          </Button>
        )} />
      </div>
    );
  };
};

export default CartPopupContent;
