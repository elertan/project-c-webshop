import * as React from "react";
import { Button, Icon } from "semantic-ui-react";
import Users from "./adminComponents/users";
import Statistics from "./adminComponents/statistics";
import Products from "./adminComponents/products";

const styles = {
  MenuPadding: {
    height: "3vw",
    display: "inline-block"
  },
  MenuPositioning: {
    marginTop: "1vw",
    display: "flex",
    justifyContent: "center"
  }
};

class Admin extends React.Component {
  public state = { ActiveItem: "Overview" };

  public changeMenuItem(name: string) {
    this.setState({
      ActiveItem: name
    });
  }

  public render() {
    // const { ActiveItem } = this.state;
    let PageContent;
    if (this.state.ActiveItem === "Users") {
      PageContent = <Users />;
    } else if (this.state.ActiveItem === "Statistics") {
      PageContent = <Statistics />;
    } else if (this.state.ActiveItem === "Products") {
      PageContent = <Products />;
    }

    return (
      <div>
        <div style={styles.MenuPositioning}>
          <Button.Group basic size="huge">
            <Button
              animated="fade"
              size="massive"
              positive={this.state.ActiveItem === "Users"}
              onClick={() => this.changeMenuItem("Users")}
            >
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

            <Button.Or />

            <Button
              animated="fade"
              size="massive"
              positive={this.state.ActiveItem === "Products"}
              onClick={() => this.changeMenuItem("Products")}
            >
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

            <Button.Or />

            <Button
              animated="fade"
              size="massive"
              header={this.state.ActiveItem === "Statistics"}
              onClick={() => this.changeMenuItem("Statistics")}
            >
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
          </Button.Group>
        </div>
        <div>{PageContent}</div>
      </div>
    );
  }
}

export default Admin;
