import {Container} from 'unstated';
import IProduct from '../../src/models/IProduct';

interface IState {
  products: IProduct[];
}

class WishlistState extends Container<IState> {
  public state = {
    products: []
  };

  public addToWishlist = (product: IProduct) => {
    const products = [...this.state.products, product];
    this.setState({ products });
  };

  public removeFromWishlist = (productId: number) => {
    const products = this.state.products.filter((p: IProduct) => p.id !== productId);
    this.setState({ products });
  };

  public isInWishlist = (productId: number) => {
    const product = this.state.products.find((p: IProduct) => p.id === productId);
    return product !== undefined;
  };
}

export default WishlistState;
