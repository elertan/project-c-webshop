import * as React from 'react';
import {RouteComponentProps} from "react-router";
import Detail from "../../views/album/detail/Detail";

interface IRouteProps {
  id: string;
}

interface IProps extends RouteComponentProps<IRouteProps> {
  
}
interface IState {}

class DetailContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Detail albumId={Number(this.props.match.params.id)} />
    );
  }
};

export default DetailContainer;
