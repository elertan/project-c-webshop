import * as React from 'react';
import './Albums.css';
import {Typography, List} from "@material-ui/core";
import HomeLayout from "../../layout/HomeLayout/HomeLayout";
import album from "./album.jpg";
interface IProps {
}

const Album: React.SFC<IProps> = (props: IProps) => {
  return (
    <HomeLayout>
      <div className="Home">
        <Typography>This is the album content</Typography>
        <List >
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
            <img className = "Home-Album" src = {album}/>
        
        
        
        </List>
        
      </div>
    </HomeLayout>
  );
}

export default Album;
