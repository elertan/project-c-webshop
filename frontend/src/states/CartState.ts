
import {Container} from 'unstated';
import IProduct from '../../src/models/IProduct';
import {wishlistState} from "../index";

interface IState {
  products: IProduct[];
}

class CartState extends Container<IState> {
  public state = {
    products: []
  };

  public addToCart = (product: IProduct) => {
    if (wishlistState.isInWishlist(product.id)) {
      wishlistState.removeFromWishlist(product.id);
    }

    const products = [...this.state.products, product];
    this.setState({ products });
  };

  public removeFromCart = (productId: number) => {
    const products = this.state.products.filter((p: IProduct) => p.id !== productId);
    this.setState({ products });
  };

  public isInCart = (productId: number) => {
    const product = this.state.products.find((p: IProduct) => p.id === productId);
    return product !== undefined;
  };
}

export default CartState;
