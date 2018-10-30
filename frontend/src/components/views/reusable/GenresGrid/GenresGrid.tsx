import * as React from 'react';
import './Genres.css';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

interface IProps {
  id: number;
  name: string;
  imageUrl: string;
}

const ArtistGrid: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/artist/${props.id}`}>
      <div
        className="AlbumCover-root"
      >
        <img
          className="AlbumCover-img"
          src={props.imageUrl}
        />
        <Typography className="AlbumCover-name">{props.name}</Typography>
      </div>
    </Link>
  );
};

export default ArtistGrid;
