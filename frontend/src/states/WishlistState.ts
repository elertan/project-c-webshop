import {Container} from 'unstated';
import IProduct from '../../src/models/IProduct';

interface IState {
  products: IProduct[];
}

class WishlistState extends Container<IState> {
  public state = {
    products: []
  };
  
}

export default WishlistState;
