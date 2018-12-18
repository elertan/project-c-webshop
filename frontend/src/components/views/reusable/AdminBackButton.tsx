import * as React from "react";
import { Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const styles = {
  ButtonPadding: {
    padding: "2vw"
  }
};

class AdminBackButton extends React.Component {
  public render() {
    return (
      <div style={styles.ButtonPadding}>
        <NavLink to={"/admin"}>
          <Button basic animated="fade" size="huge">
            <Button.Content visible>
              {" "}
              <Icon name="arrow left" />
              Back
            </Button.Content>
            <Button.Content hidden>
              {" "}
              <Icon name="arrow left" />
              Back
            </Button.Content>
          </Button>
        </NavLink>
      </div>
    );
  }
}

export default AdminBackButton;
