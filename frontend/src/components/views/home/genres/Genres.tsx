import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import {withStyles} from '@material-ui/core';
import styles, {StyleProps} from "../albums/TrackStyle";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import GenresGrid from "../../reusable/GenresGrid/GenresGrid";
import GridView from "../../reusable/GridView/GridView";

interface IProps extends StyleProps {

}
// Hier komt dan de query om alle tracks en bijbehorende informatie
// te krijgen voor een specifiek genre 
const query = gql`
{
  categories
  {
    id
    name
    imageUrl
  }
}`;

class Genres extends React.Component<IProps> {
  public render() {
    return (
      <AppLayout>
        <Query query={query}>
          {({loading, error, data}) => {
              if (loading) {
                return null;
              }
              if (error) {
                return <span>{error.message}</span>;
              }
              return this.renderDetail(data.categories);
            }}
        </Query>
      </AppLayout>
    );
  }

  private renderDetail = (categories: any[]) => {
    const data = categories.map((category: any, i: number) =>
    
    <GenresGrid key={i} id={category.id} name={category.name} imageUrl={category.imageUrl}/>
    );
    return <GridView elements={data}/>;
  };
}

export default withStyles(styles)(Genres);

