import * as React from "react";
// import AppLayout from "../../../layout/AppLayout/AppLayout";
import { Header, Icon, Message } from "semantic-ui-react";

const styles = {
  DashboardPositioning: {
    display: "inline-block",
    width: "60%",
    marginTop: "-20vw",
    padding: "3%"
  },
  HeaderPositioning: {
    margin: "3% 0 0 0"
  }
};

class PasswordResetSucces extends React.Component {
  public render() {
    return (
      <div>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Icon name="key" />
            <Header.Content>
              Password reset
              <Header.Subheader>Reset your password</Header.Subheader>
            </Header.Content>
          </Header>
        </div>

        <div style={styles.DashboardPositioning}>
          <Message
            icon="inbox"
            header="Hooray!"
            content="You have succesfully updated your password! You may now continue listening to our marsh-mellowy tunes."
          />
        </div>
      </div>
    );
  }
}

export default PasswordResetSucces;
