import * as React from "react";
import AppLayout from "../../layout/AppLayout/AppLayout";
import {  Form, Table } from "semantic-ui-react";
import DashboardMenu from "../../reusable/DashboardMenu/DashboarMenu";
import styles from "../accountDetails/AccountDetailsStyle";

class OrderHistory extends React.Component {
  public state = {};

  public render() {
    return (
      <AppLayout>
        <DashboardMenu/>
       <div style={styles.DashboardPositioning}>
          <Form>

              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <h3>
                        <b>Email : </b>
                      </h3>
                      {"tim-prins@live.nl"}
                    </Table.Cell>
                    <Table.Cell>
                      <h1>Hey</h1>
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={5}>
                    <h1>Hey</h1>
                    </Table.Cell>
                    <Table.Cell >
                    <h1>Hey</h1>
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell width={5}>
                    <h1>Hey</h1>
                    </Table.Cell>
                    <Table.Cell >
                    <h1>Hey</h1>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

          </Form>
        </div>
      </AppLayout>
    );
  }
}

export default OrderHistory;
