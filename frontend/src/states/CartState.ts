
import {Container} from 'unstated';
import IProduct from '../../src/models/IProduct';

interface IState {
  products: IProduct[];
}

class CartState extends Container<IState> {
  state = {
    products: []
  };
}

export default CartState;
