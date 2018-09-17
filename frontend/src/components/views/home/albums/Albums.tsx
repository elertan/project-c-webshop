import * as React from 'react';
import './Albums.css';
import {Typography, List} from "@material-ui/core";
import HomeLayout from "../../layout/HomeLayout/HomeLayout";
import AlbumDesign from './AlbumDesign';
interface IProps {
}

const Album: React.SFC<IProps> = (props: IProps) => {
  return (
    <HomeLayout>
      <div className="Albums">
        <Typography>This is the album content</Typography>
        <List >
           
           <AlbumDesign/>
            
        </List>
        
      </div>
    </HomeLayout>
  );
}

export default Album;
