import * as React from 'react';
import {RouteProps} from "react-router";
import Album from "../../../../views/dashboard/admin/adminComponents/albums/Albums";
interface IProps extends RouteProps {}
interface IState {}

class AlbumContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Album/>
    );
  }
};

export default AlbumContainer;
