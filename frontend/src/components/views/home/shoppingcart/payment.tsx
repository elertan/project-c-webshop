import * as React from "react";

import AppLayout from "../../layout/AppLayout/AppLayout";
import {
  List,
  ListHeader
} from "semantic-ui-react";

interface IProps {}

class Payment extends React.Component<IProps> {

    public state={ 
    button1: false,
    button2: false
  }
 public setButton2False =() => {
    this.setState({button2: false ,button1: true})
  }
  public setButton1False =() => {
    this.setState({button1: false, button2: true})
  }
  
  public render() {
    return (
      <AppLayout>
                <List divided>
                  <ListHeader as="h1">Payment page</ListHeader>
                </List> 
      </AppLayout>
    )}
            }

export default Payment;
