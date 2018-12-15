import * as React from "react";
import AppLayout from "../../../layout/AppLayout/AppLayout";
import { Header, Icon } from "semantic-ui-react";
import DashboardMenu from "../../../reusable/DashboardMenu/DashboardMenu";

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

class Overview extends React.Component {
  public state = {};

  public render() {
    return (
      <AppLayout>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="user circle outline" />
            <Header.Content>
              Account overview
              <Header.Subheader>Manage your account</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <DashboardMenu />
      </AppLayout>
    );
  }
}

export default Overview;
