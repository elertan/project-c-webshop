import * as React from 'react';
import IArtistGridData from "./IArtistGridData";
import ArtistImg from "./ArtistImg";

interface IProps {
  data: IArtistGridData[];
}

const ArtistGrid: React.SFC<IProps> = (props: IProps) => {
  return (
    <div className="ArtistsGrid-root">
      {props.data.map((dataElement, i) =>
        <div key={i} className="ArtistGrid-element">
          <ArtistImg {...dataElement} />
        </div>
      )}
    </div>
  );
};

export default ArtistGrid;
