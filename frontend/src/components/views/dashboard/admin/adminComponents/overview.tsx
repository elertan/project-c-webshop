import * as React from "react";
import { Button, Icon } from "semantic-ui-react";

class Overview extends React.Component {
  public render() {
    return (
      <Button.Group size="massive">
        <Button size="massive"><Icon name='users' />Users</Button>
        <Button.Or />
        <Button size="massive"><Icon name='sound' />Products</Button>
        <Button.Or />
        <Button size="massive"><Icon name='line graph' />Statistics</Button>
      </Button.Group>
    );
  }
}

export default Overview;
