import * as React from "react";
import AppLayout from "../../layout/AppLayout/AppLayout";
import { } from "semantic-ui-react";
import DashboardMenu from "../../reusable/DashboardMenu/DashboarMenu";

class OrderHistory extends React.Component {
  public state = {};

  public render() {
    return (
      <AppLayout>
        <DashboardMenu />
        <h1> Test </h1>
      </AppLayout>
    );
  }
}

export default OrderHistory;
