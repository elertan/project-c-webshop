import * as React from 'react';
import './Albums.css';
import album from "./album.jpg";
interface IProps {
}
 class AlbumDesign extends React.Component<IProps>{
public render(){

    return (
          
            <img className="Albums-Image" src={album}/>
        
     
      );
    
};
}
export default AlbumDesign;
