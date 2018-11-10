import * as React from 'react';
import './CategoryCover.css';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

interface IProps {
  id: number;
  name: string;
  imageUrl: string;
}

const CategoryCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/genre/${props.id}`}>
      <div
        className="CategoryCover-root"
      >
        <img
          className="CategoryCover-img"
          src={props.imageUrl}
        />
        <Typography className="GategoryCover-name">{props.name}</Typography>
      </div>
    </Link>
  );
};

export default CategoryCover;
