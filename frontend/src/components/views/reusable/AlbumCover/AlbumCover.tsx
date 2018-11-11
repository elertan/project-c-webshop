import * as React from 'react';
import './AlbumCover.css';
import { Link } from 'react-router-dom';

interface IProps {
  name: string;
  imageSource: string;
  id: number;
}

const AlbumCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <Link to={`/album/${props.id}`}>
      <div
        className="AlbumCover-root"
      >
        <img
          className="AlbumCover-img"
          src={props.imageSource}
        />
        <div className="AlbumCover-name">
          {props.name}
        </div>
      </div>
    </Link>
  );
};

export default AlbumCover;
