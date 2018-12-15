import * as React from 'react';
import ConfirmOrder from 'src/components/views/home/shoppingcart/ConfirmOrder';


interface IProps {}
interface IState {}

class ConfirmOrderContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <ConfirmOrder/>
    );
  }
};

export default ConfirmOrderContainer;
