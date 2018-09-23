import * as React from 'react';
import './AlbumCover.css';
import {Typography} from "@material-ui/core";

interface IProps {
  name: string;
  imageSource: string;
  onClick?: () => void;
}

const AlbumCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <div
      className="AlbumCover-root"
      onClick={props.onClick}
    >
      <img
        className="AlbumCover-img"
        src={props.imageSource}
      />
      <Typography className="AlbumCover-name">{props.name}</Typography>
    </div>
  );
};

export default AlbumCover;
