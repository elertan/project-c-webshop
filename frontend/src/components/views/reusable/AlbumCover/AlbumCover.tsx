import * as React from 'react';
import './AlbumCover.css';
import { Link } from 'react-router-dom';
import IImage from "../../../../models/IImage";
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";
import {Typography} from "@material-ui/core";
import { Button } from 'semantic-ui-react';
import { Subscribe } from 'unstated';
import WishState from 'src/states/WishState';
import IProduct from "src/models/IProduct";

interface IProps {
  name: string;
  imageSource?: IImage[];
  id: number;
}



const AlbumCover: React.SFC<IProps> = (props: IProps) => {
  return (
    <div>
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
       
        
        
        <Typography className="AlbumCover-name">{props.name}</Typography>
      </div>
    </Link>
     <Subscribe to={[WishState]}>
     {wishState => (
       <Button icon = "heart" onClick={addToWish(props,wishState)}/>
     )}
     </Subscribe>
     </div>
  );
 
};
const addToWish = (props: IProps ,wishState: WishState) => () => {
  const product: IProduct = {
    id: wishState.state.products.length + 1,
    album: {
      id: props.id,
      name: props.name,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  };
  
  if(wishState.state.products.filter(el => props.id === el)){
    console.log('error');
  }
  else{
  wishState.setState({ products: [...wishState.state.products, product] });}
};

export default AlbumCover;
