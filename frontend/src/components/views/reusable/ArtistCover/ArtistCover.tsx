import * as React from 'react';
import './ArtistCover.css';
import { Link } from 'react-router-dom';
import IImage from "../../../../models/IImage";
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";

interface IProps {
  name: string;
  imageSource?: IImage[];
  id: number;
}

const ArtistCover: React.SFC<IProps> = (props: IProps) => {
  console.log(props);
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

export default ArtistCover;
