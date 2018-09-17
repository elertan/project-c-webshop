import * as React from 'react';
import Albums from "../../../views/home/albums/Albums";

interface IProps {}
interface IState {}

class AlbumsContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Albums/>
    );
  }
};

export default AlbumsContainer;
