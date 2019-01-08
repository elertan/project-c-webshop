import * as React from 'react';
import {RouteProps} from "react-router";
import Artists from "../../../../views/dashboard/admin/adminComponents/Artists/Artists";
interface IProps extends RouteProps {}
interface IState {}

class ArtistsContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Artists/>
    );
  }
};

export default ArtistsContainer;
