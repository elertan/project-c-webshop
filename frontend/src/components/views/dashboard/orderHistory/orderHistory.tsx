import * as React from "react";
import AppLayout from "../../layout/AppLayout/AppLayout";
import { Item, Header, Icon } from "semantic-ui-react";
import DashboardMenu from "../../reusable/DashboardMenu/DashboardMenu";

const styles = {
  DashboardPositioning: {
    display: "inline-block",
    width: "60%",
    padding: "3%"
  },
  HeaderPositioning: {
    margin: "3% 0 0 0"
  }
};

class OrderHistory extends React.Component {
  public state = {};

  public render() {
    return (
      <AppLayout>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="send" />
            <Header.Content>
              Order History
              <Header.Subheader>View your recent orders</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <DashboardMenu />
        <div style={styles.DashboardPositioning}>
          <Item.Group divided>
            <Item>
              <Item.Image
                size="tiny"
                src="https://react.semantic-ui.com/images/wireframe/image.png"
              />
              <Item.Content verticalAlign="middle">Content A</Item.Content>
            </Item>

            <Item>
              <Item.Image
                size="tiny"
                src="https://react.semantic-ui.com/images/wireframe/image.png"
              />
              <Item.Content verticalAlign="middle">Content B</Item.Content>
            </Item>

            <Item>
              <Item.Image
                size="tiny"
                src="https://react.semantic-ui.com/images/wireframe/image.png"
              />
              <Item.Content content="Content C" verticalAlign="middle" />
            </Item>
          </Item.Group>
        </div>
      </AppLayout>
    );
  }
}

export default OrderHistory;
