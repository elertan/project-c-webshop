import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import {Grid} from "semantic-ui-react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import CategoryCover from '../../reusable/CategoryCover/CategoryCover';
import AlbumCover from '../../reusable/AlbumCover/AlbumCover';
import ArtistCover from "../../reusable/ArtistCover/ArtistCover";
import {Carousel} from "react-responsive-carousel";
import {arrayChunkBy} from "../../../../utils/array";

interface IProps {
  categoryId: number;
}

class CategoryDetail extends React.Component<IProps> {
  public render() {
    const query = gql`
        {
            categories(ids: "${this.props.categoryId}") {
                items {
                    name
                    id
                    images(orderBy: {path: "height", descending: true}, first: 1) {
                        items {
                          url
                        }
                      }
                }
            }
        }`;

    const dummyAlbumsQuery = gql`
        {
            albums(ids:["7", "5", "3", "12", "18", "16", "30", "28", "19", "31"]) {
                items {
                  name
                  id
                  images(orderBy: {path: "height", descending: true}, first: 1) {
                    items {
                      url
                    }
                  }
                }
              }
        }`;

    const dummyArtistsQuery = gql`
        {
            artists(ids:["1", "2", "3", "25", "18", "17", "30", "40", "9", "69"]) {
                items {
                  name
                  id
                  images(orderBy: {path: "height", descending: true}, first: 1) {
                    items {
                      url
                    }
                  }
                }
              }
        }`;

    return (
      <AppLayout>
        <h1>Category</h1>
        <Query query={query}>
          {({loading, error, data}) => {
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
        <h1>Albums</h1>
        <Query query={dummyAlbumsQuery}>
          {({loading, error, data}) => {
            if (loading) {
              return null;
            }
            if (error) {
              return <span>{error.message}</span>
            }
            console.log(data);
            return <div>{this.renderAlbumsDetail(data.albums.items)}</div>
          }}
        </Query>
        <h1>Artists</h1>
        <Query query={dummyArtistsQuery}>
          {({loading, error, data}) => {
            if (loading) {
              return null;
            }
            if (error) {
              return <span>{error.message}</span>
            }
            console.log(data);
            return <div>{this.renderArtistsDetail(data.artists.items)}</div>
          }}
        </Query>
      </AppLayout>
    )
  }

  private renderDetail = (categories: any[]) => {
    return (
      <div>
        {categories.map((category: any, i: number) =>
          <CategoryCover
            key={i}
            id={category.id}
            name={category.name}
            imageSource={category.images.items}
          />
        )}
      </div>
    )
  };

  private renderAlbumsDetail = (albums: any[]) => {
    return (
      <div>
        <div style={{marginTop: 15}}>
          <Carousel
            showThumbs={false}
            showIndicators={false}
            autoPlay
            infiniteLoop
            interval={4000}
            showStatus={false}
          >
            {/*<div>*/}
              {/*<img*/}
                {/*src="https://www.dierenbescherming.nl/cache/userfiles/content/Spreekbeurten/Egels/egel_gras.jpg?w=720&fit=max&s=63f878e4d1f88c143ed5bfe07f331d8c"/>*/}
            {/*</div>*/}
            {arrayChunkBy(albums, 4).map((chunkedAlbums: any[], i: number) =>
              <div key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Grid
                  columns={4}
                  doubling
                >
                  {chunkedAlbums.map((album: any, i2: number) =>
                    <AlbumCover
                      key={i2}
                      id={album.id}
                      name={album.name}
                      imageSource={album.images.items}/>
                  )}
                </Grid>
              </div>
            )}
          </Carousel>
        </div>
      </div>
    )
  };

  private renderArtistsDetail = (artists: any[]) => {
    return (
      <div>
        <div style={{marginTop: 15}}>
          <Grid
            columns={4}
            doubling
          >
            {artists.map((artist: any, i: number) =>
              <ArtistCover
                key={i}
                id={artist.id}
                name={artist.name}
                imageSource={artist.images.items}/>
            )}
          </Grid>
        </div>
      </div>
    )
  }
}

export default CategoryDetail;
