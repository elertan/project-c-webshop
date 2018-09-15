import * as React from 'react';
import HomeLayout from "../../layout/HomeLayout/HomeLayout";
import {Typography} from "@material-ui/core";

interface IProps {}

class Trending extends React.Component<IProps> {
  public render() {
    return (
      <HomeLayout>
        <Typography>Trending!</Typography>
      </HomeLayout>
    );
  }
};

export default Trending;
