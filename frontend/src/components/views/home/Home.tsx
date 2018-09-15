import * as React from 'react';
import './Home.css';
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import {Typography} from "@material-ui/core";

interface IProps {}

const Home: React.SFC<IProps> = (props: IProps) => {
  return (
    <HomeLayout>
      <div className="Home">
        <Typography>Content!</Typography>
      </div>
    </HomeLayout>
  );
}

export default Home;
