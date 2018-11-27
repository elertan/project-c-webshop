import * as React from "react";
import AppLayout from "../../layout/AppLayout/AppLayout";
import { } from "semantic-ui-react";
import DashboardMenu from "../../reusable/DashboardMenu/DashboarMenu";
import styles from "../accountDetails/AccountDetailsStyle";

class PaymentDetails extends React.Component {
  public state = {};

  public render() {
    return (
      <AppLayout>
        <DashboardMenu/>
        <div style={styles.DashboardPositioning}>
        <h1> PaymentDetails </h1>
        </div>
      </AppLayout>
    );
  }
}

export default PaymentDetails;
