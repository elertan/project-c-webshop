import * as React from 'react';
import './AlbumCover.css';
import { Link } from 'react-router-dom';
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";
import IImage from "../../../../models/IImage";

interface IProps {
  name: string;
  imageSource: IImage[];
  id: number;
}

const AlbumCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/album/${props.id}`}>
      <div
        className="AlbumCover-root"
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
        {/* <Typography className="AlbumCover-name">{props.name}</Typography> */}
        <div className="AlbumCover-name">{props.name}</div>
      </div>
    </Link>
  );
};

export default AlbumCover;
