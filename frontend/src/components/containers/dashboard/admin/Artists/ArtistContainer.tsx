import * as React from 'react';
import {RouteProps} from "react-router";
import Artist from "../../../../views/dashboard/admin/adminComponents/artists/artists2";
interface IProps extends RouteProps {}
interface IState {}

class ArtistContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Artist/>
    );
  }
};

export default ArtistContainer;
