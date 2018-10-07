import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import {Typography} from "@material-ui/core";

interface IProps {}

class Genres extends React.Component<IProps> {
  public render() {
    return (
      <AppLayout>
        <Typography> 
          Here you'll be able to browse music (albums, tracks or artists?) based on genre! 
        </Typography>
      </AppLayout>
    );
  }
};

export default Genres;
