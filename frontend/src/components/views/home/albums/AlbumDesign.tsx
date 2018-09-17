import * as React from 'react';
import './Albums.css';
import album from "./album.jpg";

interface IProps {
}
 class AlbumDesign extends React.Component<IProps>{
public render(){

    return (
          <div className= "Albums-Image">
            <img  src={album}/>
                  <p className="Albums-Title">Album title</p>
            </div>
      );
    
};
}
export default AlbumDesign;
