import * as React from 'react';
import './ArtistCover.css';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

interface IProps {
  name: string;
  imageSource: string;
  id: number;
}

const ArtistCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/album/${props.id}`}>
      <div
        className="AlbumCover-root"
      >
        <img
          className="AlbumCover-img"
          src={props.imageSource}
        />
        <Typography className="AlbumCover-name">{props.name}</Typography>
      </div>
    </Link>
  );
};

export default ArtistCover;
