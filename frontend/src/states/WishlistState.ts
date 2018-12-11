import {Container} from 'unstated';
import IProduct from '../../src/models/IProduct';

interface IState {
  products: IProduct[];
}
const localStorageKey = "WishlistState_state";
const rawData = localStorage.getItem(localStorageKey);
const initialState: IState = rawData ? JSON.parse(rawData) : {
  products: []
};

class WishlistState extends Container<IState> {
  public state = initialState;
  private readonly originalSetStateFn: (newState: IState) => Promise<void>;

  constructor() {
    super();

    this.originalSetStateFn = this.setState;
    this.setState = async (newState: IState) => {
      const promise = this.originalSetStateFn(newState);

      localStorage.setItem(localStorageKey, JSON.stringify(newState));

      return promise;
    };
  }

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
