import * as React from 'react';
import './GenreCover.css';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

interface IProps {
  id: number;
  name: string;
  imageUrl: string;
}

const GenreCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/genre/${props.id}`}>
      <div
        className="GenreCover-root"
      >
        <img
          className="GenreCover-img"
          src={props.imageUrl}
        />
        <Typography className="GenreCover-name">{props.name}</Typography>
      </div>
    </Link>
  );
};

export default GenreCover;
