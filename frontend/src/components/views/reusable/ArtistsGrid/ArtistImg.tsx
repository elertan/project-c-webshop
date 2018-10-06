import * as React from 'react';
import { Typography } from "@material-ui/core";

interface IProps {
  name: string;
  imageSource: string;
  id: number;
}

const ArtistImg: React.SFC<IProps> = (props: IProps) => {
  return (
      <div>
        <img className="Artist-img" src={props.imageSource}/>
        <Typography className="Artist-name">{props.name}</Typography>
      </div>
  );
};

export default ArtistImg;
