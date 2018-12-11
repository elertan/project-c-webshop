import * as React from "react";

import AppLayout from "../../layout/AppLayout/AppLayout";

import { Subscribe } from "unstated";
import CartState from "src/states/CartState";


interface IProps {}


class ConfirmOrder extends React.Component<IProps> {
  public render() {
    return (
      <Subscribe to={[CartState]}>
        {(cartState: CartState) => (
          <AppLayout>
          <p>your order is send</p>
          </AppLayout>
        )}
      </Subscribe>
    );
  }
}

export default ConfirmOrder;
