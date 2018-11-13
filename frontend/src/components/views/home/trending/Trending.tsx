import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import { Subscribe } from 'unstated';
import CartState from 'src/states/CartState';

interface IProps {}

class Trending extends React.Component<IProps> {
  public render() {

    return (
      <AppLayout>
        <Subscribe to={[CartState]}> 
          {(cartState: CartState) => (
            <code>
              {JSON.stringify(cartState)}
            </code>
          )}
        </Subscribe>
      </AppLayout>
    );
  }
};

export default Trending;
