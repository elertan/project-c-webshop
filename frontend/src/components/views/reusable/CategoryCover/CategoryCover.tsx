import * as React from 'react';
import './CategoryCover.css';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";
import IImage from "../../../../models/IImage";

interface IProps {
  id: number;
  name: string;
  imageSource: IImage[];
}

const CategoryCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/category/${props.id}`}>
      <div
        className="CategoryCover-root"
      >
        {(props.imageSource && props.imageSource.length > 0) ?
          <ProgressiveImage
            imgProps={{
              className: "AlbumCover-img"
            }}
            placeholder={props.imageSource[0].url}
            src={props.imageSource[props.imageSource.length - 1].url}
          />
          :
          <img
            className="AlbumCover-img"
            src="default?"
          />
        }
        <Typography className="CategoryCover-name">{props.name}</Typography>
      </div>
    </Link>
  );
};

export default CategoryCover;
