import * as React from "react";
import { RouteProps } from "react-router";
import AlbumSongStats from "../../../../views/dashboard/admin/adminComponents/statistics/AlbumSongStats";

interface IProps extends RouteProps {}
interface IState {}

class AlbumSongStatsContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return <AlbumSongStats />;
  }
}

export default AlbumSongStatsContainer;
