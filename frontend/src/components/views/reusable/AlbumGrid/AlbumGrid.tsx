import * as React from 'react';
import IAlbumGridData from "./IAlbumGridData";
import AlbumCover from "../AlbumCover/AlbumCover";
import './AlbumGrid.css';

interface IProps {
  data: IAlbumGridData[];
}

const AlbumGrid: React.SFC<IProps> = (props: IProps) => {
  return (
    <div className="AlbumGrid-root">
      {props.data.map((dataElement, i) =>
        <div key={i} className="AlbumGrid-element">
          <AlbumCover {...dataElement} />
        </div>
      )}
    </div>
  );
};

export default AlbumGrid;
