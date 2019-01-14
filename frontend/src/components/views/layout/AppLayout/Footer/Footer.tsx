import * as React from 'react';
import {Container, Segment} from "semantic-ui-react";

interface IProps {}
interface IState {}

class Footer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
          <p>The Flying Marshmallows Webshop is a simulation of a real digital content webshop used for educational purposes.</p>
          <p>Copyright &copy; {new Date().getFullYear()} The Flying Marshmallows&trade;. All rights reserved.</p>
        </Container>
      </Segment>
    );
  }
};

export default Footer;
