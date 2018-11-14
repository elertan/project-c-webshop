import * as React from "react";
import "./AlbumCover.css";
import { Link } from "react-router-dom";
import IImage from "../../../../models/IImage";
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";
import { Typography } from "@material-ui/core";

interface IProps {
  name: string;
  imageSource?: IImage[];
  id: number;
}

class AlbumCover extends React.Component<IProps> {
  public render() {
    return (
      <Link to={`/album/${this.props.id}`}>
        <div className="AlbumCover-root">
          {this.props.imageSource && this.props.imageSource.length > 0 ? (
            <ProgressiveImage
              imgProps={{
                className: "AlbumCover-img"
              }}
              placeholder={this.props.imageSource[0].url}
              src={
                this.props.imageSource[this.props.imageSource.length - 1].url
              }
            />
          ) : (
            <img className="AlbumCover-img" src="default?" />
          )}

          <Typography className="AlbumCover-name">{this.props.name}</Typography>
        </div>
      </Link>
    );
  }
}
export default AlbumCover;
