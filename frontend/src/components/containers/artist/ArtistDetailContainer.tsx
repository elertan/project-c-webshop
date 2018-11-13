import * as React from 'react';
import {RouteComponentProps} from "react-router";
import ArtistDetail from "../../views/artist/detail/ArtistDetail";

interface IRouteProps {
  id: string;
}

interface IProps extends RouteComponentProps<IRouteProps> {
  
}
interface IState {}

class ArtistDetailContainer extends React.Component<IProps, IState> {
  public state = {};
  
  public render() {
    return (
      <ArtistDetail artistId={Number(this.props.match.params.id)} />
    );
  }
};

export default ArtistDetailContainer;