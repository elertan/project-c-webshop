import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
// import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
// import ArtistCover from "../../reusable/ArtistCover/ArtistCover";
import {Grid} from "semantic-ui-react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import CategoryCover from '../../reusable/CategoryCover/CategoryCover';
import artistPlaceholder from '../../../../img/artist.jpg';
import albumPlaceholder from '../../../../img/album.jpg';

interface IProps {
    categoryId: number;
}

class CategoryDetail extends React.Component<IProps> {
    public render() {
        const query = gql`
        {
            categories(ids: "${this.props.categoryId}") {
                items {
                    id
                    name
                }
            }
        }`;

        return (
            <AppLayout>
              <Query query={query}>
                {({loading, error, data }) => {
                  if (loading) {
                    return null;
                  }
                  if (error) {
                    return <span>{error.message}</span>
                  }
                  console.log(data);
                  return <div>{this.renderDetail(data.categories.items)}</div>
                }}
              </Query>
            </AppLayout>
        )
    }

    private renderDetail = (categories:any[]) => {
        return (
          <div>
            <div style={{ marginTop: 15 }}>
                <Grid
                columns={4}
                doubling
                >
                {categories.map((category: any, i: number) =>
                <CategoryCover // Album Cover
                    key={i} 
                    id={category.id} 
                    name="Album name" 
                    imageSource={albumPlaceholder}/>
                )}
                </Grid>
            </div>
            <div style={{ marginTop: 15 }}>
                <Grid
                columns={4}
                doubling
                >
                {categories.map((category: any, i: number) =>
                <CategoryCover // Artist Cover
                    key={i} 
                    id={category.id} 
                    name="Artist name"
                    imageSource={artistPlaceholder}/>
                )}
                </Grid>
            </div>
          </div>
        )
    }
}

export default CategoryDetail;
