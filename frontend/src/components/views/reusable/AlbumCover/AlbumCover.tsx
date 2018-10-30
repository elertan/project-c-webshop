import * as React from 'react';
import './AlbumCover.css';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

interface IProps {
  name: string;
  imageSource: string;
  id: number;
}

const AlbumCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/album/${props.id}`}>
      <div
        className="GenreCover-root"
      >
        <img
          className="GenreCover-img"
          src={props.imageSource}
        />
        <Typography className="GenreCover-name">{props.name}</Typography>
      </div>
    </Link>
  );
};

export default AlbumCover;
