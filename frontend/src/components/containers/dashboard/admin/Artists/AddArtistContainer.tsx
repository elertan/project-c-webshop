import * as React from 'react';
import {RouteProps} from "react-router";
import AddArtist from "../../../../views/dashboard/admin/adminComponents/artists/AddArtist";
interface IProps extends RouteProps {}
interface IState {}

class AddArtistContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <AddArtist/>
    );
  }
};

export default AddArtistContainer;
