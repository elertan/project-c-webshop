import * as React from 'react';
import './Artist.css';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

interface IProps {
  name: string;
  imageSource: string;
  id: number;
}

const ArtistGrid: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/artist/${props.id}`}>
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

export default ArtistGrid;
