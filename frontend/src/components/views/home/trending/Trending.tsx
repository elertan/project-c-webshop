import * as React from 'react';
import {Typography} from "@material-ui/core";
import AppLayout from "../../layout/AppLayout/AppLayout";

interface IProps {}

class Trending extends React.Component<IProps> {
  public render() {
    return (
      <AppLayout>
        <Typography>Trending!</Typography>
      </AppLayout>
    );
  }
};

export default Trending;
