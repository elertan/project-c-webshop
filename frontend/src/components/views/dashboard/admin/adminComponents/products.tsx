import * as React from "react";
import { Header, Menu, Divider } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const styles = {
  MenuPadding: {
    padding: "2vw"
  },
  HeaderPositioning: {
    display: "flex",
    justifyContent: "center"
  }
};

class Products extends React.Component {
  public render() {
    return (
      <div>
        <div style={styles.HeaderPositioning}>
          <Header as="h2">
            <Header.Content>
              <div style={styles.HeaderPositioning}>Products</div>
              <Header.Subheader>
                In this tab you can add new songs or albums, delete old songs or
                albums and update information regarding the music
              </Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={styles.MenuPadding}>
          <Menu vertical>
            <Menu.Item>
              <NavLink to={""}>
                <Header size="small">Products</Header>
              </NavLink>
              <NavLink to={""}>
                <Menu.Item name="All products" />
              </NavLink>
              <Divider />

              {/* Songs */}
              <NavLink to={""}>
                <Header size="small">Songs</Header>
              </NavLink>
              <NavLink to={""}>
                <Menu.Item name="All songs" />
              </NavLink>
              <NavLink to={""}>
                <Menu.Item name="Add new song" />
              </NavLink>
              <Divider />

              {/* Albums */}
              <NavLink to={""}>
                <Header size="small">Albums</Header>
              </NavLink>
              <NavLink to={""}>
                <Menu.Item name="All albums" />
              </NavLink>
              <NavLink to={""}>
                <Menu.Item name="Add new album" />
              </NavLink>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default Products;
