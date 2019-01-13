import * as React from 'react';
import {Container, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {routes} from "../../../../../routes/RootRouter";

interface IProps {
}

interface IState {
}

class NavigationMenu extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    const activeItem = 'home' as any;

    return (
      <div style={{padding: 10, backgroundColor: '#f2f7fc'}}>
        <Container>
          <Menu secondary>
            <NavLink to={routes.home.explore}>
              <Menu.Item
                name='Explore'
                active={activeItem === 'home'}
              />
            </NavLink>
            <NavLink to={routes.home.albums}>
              <Menu.Item
                name='Albums'
                active={activeItem === 'home'}
              />
            </NavLink>
            <NavLink to={routes.home.artists}>
              <Menu.Item
                name='Artists'
                active={activeItem === 'home'}
              />
            </NavLink>
            <NavLink to={routes.home.categories}>
              <Menu.Item
                name='Categories'
                active={activeItem === 'home'}
              />
            </NavLink>
            <NavLink to={"/home/contact"}>
              <Menu.Item
                name='Contact'
                active={activeItem === 'home'}
              />
            </NavLink>
          </Menu>
        </Container>
      </div>
    );
  }
};

export default NavigationMenu;
