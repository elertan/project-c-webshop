import {Container} from 'unstated';
import IProduct from '../../src/models/IProduct';

interface IState {
  products: IProduct[];
}

class WishState extends Container<IState> {
  public state = {
    products: []
  };
  
}

export default WishState;
