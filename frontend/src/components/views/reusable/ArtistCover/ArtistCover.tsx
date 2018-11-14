import * as React from 'react';
import './ArtistCover.css';
import { Link } from 'react-router-dom';
import IImage from "../../../../models/IImage";
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";
import ArtistPlaceholder from "../../../../img/artist.jpg";
import {Typography} from "@material-ui/core";

interface IProps {
  name: string;
  imageSource?: IImage[];
  id: number;
}

const ArtistCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/artist/${props.id}`}>
      <div
        className="ArtistCover-root"
      >
        {(props.imageSource && props.imageSource.length > 0) ?
          <ProgressiveImage
            imgProps={{
              className: "ArtistCover-img"
            }}
            placeholder={props.imageSource[0].url}
            src={props.imageSource[props.imageSource.length - 1].url}
          />
          :
          <img
            className="ArtistCover-img"
            // src="default?"
            src={ArtistPlaceholder}
          />
        }
        <Typography className="AlbumCover-name">{props.name}</Typography>
      </div>
    </Link>
  );
};

export default ArtistCover;
