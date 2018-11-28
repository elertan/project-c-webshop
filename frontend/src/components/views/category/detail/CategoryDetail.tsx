import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {Grid} from "semantic-ui-react";
import AlbumCover from '../../reusable/AlbumCover/AlbumCover';
import ArtistCover from "../../reusable/ArtistCover/ArtistCover";
import {Carousel} from "react-responsive-carousel";
import {arrayChunkBy} from "../../../../utils/array";
import albumDetailStyle, {StyleProps} from "../../album/detail/AlbumDetailStyle";
import {withStyles} from "@material-ui/core";

interface IProps extends StyleProps {
  categoryId: number;
}

// const styles = {
//   actionsContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginBottom: 30,
//     padding: 20,
//     backgroundColor: 'rgb(243, 243, 243)'
//   }
// };

class CategoryDetail extends React.Component<IProps> {
  public render() {
    const query = gql`
        {
              categories(ids: "${this.props.categoryId}") {
                items {
                  name
                  images(orderBy: {path: "height", descending: true}, first: 1) {
                    items {
                      url
                    }
                  }
                  albums {
                    items {
                      name
                      id
                      images(orderBy: {path: "height", descending: true}, first: 1) {
                        items {
                          url
                        }
                      }
                      tracks {
                        items {
                          artists {
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
                        }
                      }
                    }
                  }
                }
              }
        }`;

    return (
      <AppLayout>
        <Query query={query}>
          {({loading, error, data}) => {
            if (loading) {
              return null;
            }
            if (error) {
              return <span>{error.message}</span>
            }
            const CategoryBannerData = data.categories.items;
            const CategoryAlbumData = data.categories.items[0].albums.items;
            const CategoryArtistData = data.categories.items[0].albums.items.map(
              (album: any) => album.tracks.items[0])
            const AllArtists = CategoryArtistData.map((track: any) => track.artists)

            return (
              <div>
                <div>{this.renderCategoryBannerDetail(CategoryBannerData)}</div>
                <h1>Albums</h1>
                <div>{this.renderCategoryAlbumsDetail(CategoryAlbumData)}</div>
                <h1>Artists</h1>
                <div>{this.renderCategoryArtistsDetail(AllArtists)}</div>
              </div>
            )
          }}
        </Query>
      </AppLayout>
    )
  }

  private renderCategoryBannerDetail = (categories: any[]) => {
    const classes = this.props.classes!;
    const categoryName = categories[0].name;
    const categoryImg = categories[0].images.items[0].url;
    
    return (
      <div style={{marginTop: 50}}>
        <div
          className={classes.albumContainerBackground}
          style={{backgroundImage: `url(${categoryImg})`}}
        />
        <div className={classes.albumInnerContainerDarkenLayer}/>
        <div className={classes.albumContainer}>
          <div className={classes.albumInnerContainer}>
            <img className={classes.image} src={categoryImg}/>
            <div className={classes.title}>{categoryName}</div>
          </div>
        </div>
      </div>
    )
  };

  private renderCategoryAlbumsDetail = (albums: any[]) => {
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

  private renderCategoryArtistsDetail = (artists: any[]) => {
    const artistDataWithDuplicates = artists.map(
      (artistObject: any) => artistObject.items.map(
       (artist: any) => artist))
       .reduce((prev: string[], curr: string[]) => [...prev, ...curr]);
    
    const artistData = Array.from(new Set(artistDataWithDuplicates));

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
            {arrayChunkBy(artistData, 4).map((chunkedArtists: any[], i: number) =>
              <div key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Grid
                  columns={4}
                  doubling
                >
                  {chunkedArtists.map((artist: any, i2: number) =>
                    <ArtistCover
                      key={i2}
                      id={artist.id}
                      name={artist.name}
                      imageSource={artist.images.items}
                      />
                  )}
                </Grid>
              </div>
            )}
          </Carousel>
        </div>
      </div>
    )
  }
}

export default withStyles(albumDetailStyle)(CategoryDetail);
