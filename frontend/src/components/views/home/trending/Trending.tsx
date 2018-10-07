import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import {Typography} from "@material-ui/core";
import gql from "graphql-tag";

interface IProps {}

class Trending extends React.Component<IProps> {
  public render() {

    const query = gql`
    {
      albums {
        name
        imageUrl
      }
    }
  `;

    return (
      <AppLayout>
        <Typography>{array.forEach(element => {
          
        });</Typography>
      </AppLayout>
    );
  }
};

export default Trending;
