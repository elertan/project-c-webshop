// See this page for a reference https://material-ui.com/demos/app-bar/#app-bar-with-a-primary-search-field

import * as React from 'react';
import Menu from "./Menu/Menu";
import {Container} from "semantic-ui-react";
import Footer from "./Footer/Footer";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
import MusicPlayer from "../../reusable/MusicPlayer/MusicPlayer";

interface IProps extends React.HTMLProps<HTMLMainElement> {
}

const styles = {
  root: {} as React.CSSProperties,
  // contentTopPadding: {
  //   padding: 33 // Equal to menu bar height
  // } as React.CSSProperties,
  content: {
    minHeight: '65vh' // In combination with the header and footer, this will make sure the footer is always at the bottom
  } as React.CSSProperties
};

class AppLayout extends React.Component<IProps> {
  public render() {
    return (
      <div style={styles.root}>
        <Menu />
        <MusicPlayer/>
        <NavigationMenu />
        <Container>
          {/*<div style={styles.contentTopPadding} />*/}
          <main style={styles.content} {...this.props} />
        </Container>
        <Footer/>
      </div>
    );
  }
};

export default AppLayout;
