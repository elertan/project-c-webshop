import * as React from 'react';
import {RouteComponentProps} from "react-router";
import AlbumDetail from "../../views/album/detail/AlbumDetail";

interface IRouteProps {
  id: string;
}

interface IProps extends RouteComponentProps<IRouteProps> {
  
}
interface IState {}

class AlbumDetailContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <AlbumDetail albumId={Number(this.props.match.params.id)} />
    );
  }
};

export default AlbumDetailContainer;
