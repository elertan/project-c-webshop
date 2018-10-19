// See this page for a reference https://material-ui.com/demos/app-bar/#app-bar-with-a-primary-search-field

import * as React from 'react';
import Menu from "./Menu/Menu";
import {Container} from "semantic-ui-react";
import Footer from "./Footer/Footer";

interface IProps extends React.HTMLProps<HTMLMainElement> {
}

const styles = {
  root: {} as React.CSSProperties,
  content: {} as React.CSSProperties
};

class AppLayout extends React.Component<IProps> {
  public render() {
    return (
      <div style={styles.root}>
        <Menu />
        <Container>
          <main style={styles.content} {...this.props} />
        </Container>
        <Footer/>
      </div>
    );
  }
};

export default AppLayout;
