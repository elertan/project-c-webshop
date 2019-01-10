import * as React from "react";
import {Button} from "semantic-ui-react";
import {RouteComponentProps, withRouter} from "react-router-dom";

const styles = {
  MenuPositioning: {
    justifyContent: "center"
  }
};

class AdminBackButton extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div style={styles.MenuPositioning}>
        <Button onClick={() => this.props.history.push("/home/explore")} color="red">Exit admin panel</Button>
        <Button onClick={() => this.props.history.push("/admin/users")}>Users</Button>
        <Button onClick={() => this.props.history.push("/admin/artists")}>Artists</Button>
        <Button onClick={() => this.props.history.push("/admin/albumxtrack")}>Album X Track</Button>
        <Button onClick={() => this.props.history.push("/admin/tracks")}>Tracks</Button>
        <Button  onClick={() => this.props.history.push("/admin/albums")}>Albums</Button>
        <Button  onClick={() => this.props.history.push("/admin/artists")}>Artists</Button>
      </div>
    );
  }
}

export default withRouter(AdminBackButton);
