import * as React from "react";
import { Button, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const styles = {
  MenuPositioning: {
    marginTop: "1vw",
    display: "flex",
    justifyContent: "center"
  }
};

class AdminBackButton extends React.Component {
  public render() {
    return (
      <div style={styles.MenuPositioning}>
        <Button.Group basic size="huge">
          <NavLink to={"/admin/users"}>
            <Button animated="fade" size="massive">
              <Button.Content visible>
                {" "}
                <Icon name="users" />
                Users
              </Button.Content>
              <Button.Content hidden>
                {" "}
                <Icon name="users" />
                Users
              </Button.Content>
            </Button>
          </NavLink>
          <Button.Or />

          <NavLink to={"/admin/products"}>
            <Button animated="fade" size="massive">
              <Button.Content visible>
                {" "}
                <Icon name="sound" />
                Products
              </Button.Content>
              <Button.Content hidden>
                {" "}
                <Icon name="sound" />
                Products
              </Button.Content>
            </Button>
          </NavLink>

          <Button.Or />

          <NavLink to={"/admin/statistics"}>
            <Button animated="fade" size="massive">
              <Button.Content visible>
                {" "}
                <Icon name="line graph" />
                Statistics
              </Button.Content>
              <Button.Content hidden>
                {" "}
                <Icon name="line graph" />
                Statistics
              </Button.Content>
            </Button>
          </NavLink>
        </Button.Group>
      </div>
    );
  }
}

export default AdminBackButton;
