import * as React from 'react';
import './Explore.css';
import {Typography} from "@material-ui/core";
import HomeLayout from "../../layout/HomeLayout/HomeLayout";

interface IProps {
}

const Explore: React.SFC<IProps> = (props: IProps) => {
  return (
    <HomeLayout>
      <div className="Home">
        <Typography>This is the explore content</Typography>
      </div>
    </HomeLayout>
  );
}

export default Explore;
