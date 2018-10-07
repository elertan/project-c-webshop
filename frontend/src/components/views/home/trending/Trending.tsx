import * as React from 'react';
import HomeLayout from "../../layout/HomeLayout/HomeLayout";
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
      <HomeLayout>
        <Typography>{array.forEach(element => {
          
        });</Typography>
      </HomeLayout>
    );
  }
};

export default Trending;
