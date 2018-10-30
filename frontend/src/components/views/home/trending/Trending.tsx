import * as React from 'react';
import {Typography} from "@material-ui/core";
import AppLayout from "../../layout/AppLayout/AppLayout";

interface IProps {}

class Trending extends React.Component<IProps> {
  public render() {

    return (
      <AppLayout>
        <Typography>Trending! Test 123</Typography>
      </AppLayout>
    );
  }
};

export default Trending;
