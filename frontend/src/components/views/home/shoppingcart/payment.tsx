import * as React from "react";

import AppLayout from "../../layout/AppLayout/AppLayout";
import {
  List,
  ListHeader,
  
} from "semantic-ui-react";
import { Button } from "@material-ui/core";

interface IProps {}

class Payment extends React.Component<IProps> {

    
  public render() {
    return (
      <AppLayout>
                <List divided>
                  <ListHeader as="h1">Payment page</ListHeader>
                  <Button  >pay</Button>
                </List>
          
      </AppLayout>
    
    )}

  
   
            }

export default Payment;
