import * as React from "react";
import { Button, Icon } from "semantic-ui-react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const styles = {
  BackButton: {
    display: "absolute",
    margin: "1vh 1vh 1vh 1vh"
  },
  MenuPositioning: {
    display: "flex",
    justifyContent: "center"
  }
};

class AdminMenu extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <div style={styles.BackButton}>
          <Button
            size="large"
            color="red"
            animated="fade"
            onClick={() => this.props.history.push("/home/explore")}
          >
            <Button.Content visible>
              <Icon name="angle double left" />
              Exit admin panel
            </Button.Content>
            <Button.Content hidden>
              <Icon name="angle double left" />
              Exit admin panel
            </Button.Content>
          </Button>
        </div>
        <div style={styles.MenuPositioning}>
          <Button.Group basic size="medium" animated="fade">
            <Button
              basic
              size="medium"
              animated="fade"
              onClick={() => this.props.history.push("/admin/users")}
            >
              <Button.Content visible>Users</Button.Content>
              <Button.Content hidden>Users</Button.Content>
            </Button>

            <Button
              basic
              size="medium"
              animated="fade"
              onClick={() => this.props.history.push("/admin/artists")}
            >
              <Button.Content visible>Artists</Button.Content>
              <Button.Content hidden>Artists</Button.Content>
            </Button>

            <Button
              basic
              size="medium"
              animated="fade"
              onClick={() => this.props.history.push("/admin/albums")}
            >
              <Button.Content visible>Albums</Button.Content>
              <Button.Content hidden>Albums</Button.Content>
            </Button>

            <Button
              basic
              size="medium"
              animated="fade"
              onClick={() => this.props.history.push("/admin/albumxtrack")}
            >
              <Button.Content visible>Album X Track</Button.Content>
              <Button.Content hidden>Album X Track</Button.Content>
            </Button>

            <Button
              basic
              size="medium"
              animated="fade"
              onClick={() => this.props.history.push("/admin/tracks")}
            >
              <Button.Content visible>Tracks</Button.Content>
              <Button.Content hidden>Tracks</Button.Content>
            </Button>

            <Button
              basic
              size="medium"
              animated="fade"
              onClick={() => this.props.history.push("/admin/statistics")}
            >
              <Button.Content visible>Statistics</Button.Content>
              <Button.Content hidden> Statistics</Button.Content>
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminMenu);
