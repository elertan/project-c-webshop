import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import CategoryCover from '../../reusable/CategoryCover/CategoryCover';
import {Grid} from "semantic-ui-react";

interface IProps {

}

// Hier komt dan de query om alle tracks en bijbehorende informatie
// te krijgen voor een specifiek genre 
const query = gql`
{
  categories(first: 999) {
    items {
      id
      name
      images(orderBy: {
        path: "height",
        descending: true
      }, first: 1) {
        items {
          url
        }
      }
    }
  }
}`;

class Categories extends React.Component<IProps> {
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
            return this.renderDetail(data.categories.items);
          }}
        </Query>
      </AppLayout>
    );
  }

  private renderDetail = (categories: any[]) => {
    return (
      <div style={{ marginTop: 15 }}>
        <Grid
          columns={5}
          doubling
        >
          {categories.map((category: any, i: number) =>
            <CategoryCover key={i} id={category.id} name={category.name} imageUrl={category.images.items[0].url}/>
          )}
        </Grid>
      </div>
    );
  };
}

export default Categories;

