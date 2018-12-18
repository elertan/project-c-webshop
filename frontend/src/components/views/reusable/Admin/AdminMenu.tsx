import * as React from "react";
import { Button, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const styles = {
  MenuPositioning: {
    justifyContent: "center"
  }
};

class AdminBackButton extends React.Component {
  public render() {
    return (
      <div style={styles.MenuPositioning}>
        <Button.Group basic size="huge">
          <NavLink to={"/admin/users"}>
            <Dropdown
              icon="users"
              text="Users"
              button
              simple
              labeled
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  icon="search"
                  text="Find user"
                  as={NavLink}
                  exact
                  to={`/admin/users/all`}
                />
                <Dropdown.Item
                  icon="add"
                  text="Add user"
                  as={NavLink}
                  exact
                  to={`/admin/users/adduser`}
                />
              </Dropdown.Menu>
            </Dropdown>
          </NavLink>
        </Button.Group>
        <Button.Group basic size="huge">
          <NavLink to={"/admin/products"}>
            <Dropdown
              icon="sound"
              text="Products"
              button
              simple
              labeled
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  icon="search"
                  text="Find product"
                  as={NavLink}
                  exact
                  to={`/admin/products/all`}
                />
                <Dropdown.Item
                  icon="add"
                  text="Add product"
                  as={NavLink}
                  exact
                  to={`/admin/products/addproduct`}
                />
              </Dropdown.Menu>
            </Dropdown>
          </NavLink>

          <NavLink to={"/admin/statistics"}>
            <Dropdown
              icon="line graph"
              text="Statistics"
              button
              simple
              labeled
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Item text="Fuck yeaaaaah" />
              </Dropdown.Menu>
            </Dropdown>
          </NavLink>
        </Button.Group>
      </div>
    );
  }
}

export default AdminBackButton;
