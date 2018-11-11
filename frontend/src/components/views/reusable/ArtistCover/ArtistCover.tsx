import * as React from 'react';
import './ArtistCover.css';
import { Link } from 'react-router-dom';

interface IProps {
  name: string;
  imageSource: string;
  id: number;
}

const ArtistCover: React.SFC<IProps> = (props: IProps) => {
  console.log(props);
  return (
    // <Link to={`/artist/${props.id}`}>
      <div className="ArtistCover-root">
        <Link to={`/artist/${props.id}`}>
        <img
          className="ArtistCover-img"
          src={props.imageSource}
        />
        <div className="ArtistCover-name">
          {props.name}
        </div>
        </Link>
      </div>
  );
};

export default ArtistCover;
