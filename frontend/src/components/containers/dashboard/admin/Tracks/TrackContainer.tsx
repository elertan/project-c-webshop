import * as React from 'react';
import {RouteProps} from "react-router";
import Track from "../../../../views/dashboard/admin/adminComponents/tracks/tracks";
interface IProps extends RouteProps {}
interface IState {}

class TrackContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Track/>
    );
  }
};

export default TrackContainer;
