
import {Container} from 'unstated';



interface IState {
  email: string;
  bank: string;  
  productIds:number[];
}

class OrderState extends Container<IState> {
  public state = {
    email: "",
    bank: "",
    productIds: []
  };

  public addProductIds = (productId: number) => {
    const productIds = [...this.state.productIds, productId];
    this.setState({ productIds });
  };
  
  public addEmail = (email: string) => {
    this.setState({ email });
  };

  public addBank = (bank: string) => {
      this.setState({bank});
  }
  };
 
export default OrderState;
