import * as React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import AppLayout from "../../layout/AppLayout/AppLayout";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
import TrackList from "../../reusable/TrackList/TrackList";
import ITrack from "src/models/ITrack";
import albumDetailStyle, {StyleProps} from "../../album/detail/AlbumDetailStyle";
import {withStyles} from "@material-ui/core";
import {Subscribe} from "unstated";
import {Button, Icon} from "semantic-ui-react";
import CartState from "src/states/CartState";
import WishlistState from "src/states/WishlistState";
import BedragWaarde, {Valuta} from "../../reusable/BedragWaarde";

interface IProps extends StyleProps {
  artistId: number
}

const styles = {
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgb(243, 243, 243)'
  },
  itemContainer: {
    backgroundColor: 'rgb(249, 249, 249)',
    marginTop: 50,
    padding: 20,
    borderRadius: 5
  }
};

class ArtistDetail extends React.Component<IProps> {
  public render() {
    const query = gql`
        {
            artists (ids: "${this.props.artistId}") {
                items {
                    name
                    id
                    images(orderBy: {
                        path: "height",
                        descending: true
                    }, first: 1) {
                        items {
                          id
                            url
                        }
                    }
                    albums {
                        items {
                            id
                            name
                            images(orderBy: {
                              path: "height",
                              descending: true
                            }, first: 1) {
                                items {
                                  id
                                    url
                                }
                            }
                            tracks {
                                items {
                                  id
                                  name
                                  durationMs
                                  previewUrl
                                  explicit
                                  artists {
                                    items {
                                      name
                                      id
                                    }
                                  }
                                  product {
                                    id
                                    price
                                  }
                                }
                              }
                        product {
                            id
                            price
                        }
                      }
                    }
                }
            }
        }
        `;

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
            const artistData = data.artists.items[0];
            console.log(artistData);
            const albumsWithDuplicates = data.artists.items[0].albums.items;
            const albumsFiltered = Array.from(new Set(albumsWithDuplicates))
            artistData.albums.items = albumsFiltered;

            const classes = this.props.classes!;

            return (
              <div style={{marginTop: 50}}>
                <div
                  className={classes.albumContainerBackground}
                  style={{backgroundImage: `url(${artistData.images.items[0].url})`}}
                />
                <div className={classes.albumInnerContainerDarkenLayer}/>
                <div className={classes.albumContainer}>
                  <div className={classes.albumInnerContainer}>
                    <img className={classes.image} style={{borderRadius: '50%'}} src={artistData.images.items[0].url}/>
                    <div className={classes.title}>{artistData.name}</div>
                  </div>
                </div>
                <h2 style={{textAlign: 'center', marginTop: 50}}>Albums</h2>
                {this.renderArtistDetail(artistData)}
              </div>
            )
          }}
        </Query>
      </AppLayout>
    );
  }

  private renderArtistDetail = (artist: any) => {
    // const classes = this.props.classes!;
    console.log(artist);

    const data: ITrack[] = artist.albums.items.map((album: any) =>
      album.tracks.items.map((track: any) =>
        ({
          id: track.id,
          title: track.name,
          artistName: track.artists.items.map((trackArtists: any) => trackArtists.name),
          albumsName: album.name,
          albumId: album.id,
          artistId: track.artists.items.map((trackArtists: any) => trackArtists.id),
          previewUrl: track.previewUrl,
          durationMs: track.durationMs,
          explicit: track.explicit,
          price: track.product.price
        } as ITrack)
      ));

    const AllTrackData = data.map((trackData: any) => trackData)
      .reduce((prev: string[], curr: string[]) => [...prev, ...curr])

    return (
      artist.albums.items.map((album: any, i: number) =>
        <div key={i} style={styles.itemContainer}>
          <div
            style={{
              backgroundImage: `url(${album.images.items[0].url})`,
              width: '100%',
              height: 200,
              backgroundPosition: 'center',
              filter: 'blur(15px)',
              marginBottom: -215,
              backgroundSize: 'cover'
            }}
          />
          {/*<div className={classes.albumInnerContainerDarkenLayer}/>*/}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 15, marginTop: 50}}>
            <AlbumCover
              name={album.name}
              imageSource={album.images.items}
              id={album.id}/>
          </div>
          <TrackList trackData={AllTrackData.filter((track: any) => track.albumId === album.id)}/>
          <div style={styles.actionsContainer}>
            <Button.Group>
              <Subscribe to={[CartState]}>
                {(cartState: CartState) => (
                  <Subscribe to={[WishlistState]}>
                    {(wishlistState: WishlistState) => (
                      <Button
                        icon
                        labelPosition="left"
                        onClick={() => wishlistState.addToWishlist({
                          id: album.product.id,
                          album,
                          price: album.product.price
                        })}
                        disabled={wishlistState.isInWishlist(album.product.id) || cartState.isInCart(album.product.id)}
                      >
                        <Icon name="heart" color="red"/>
                        Add to wishlist
                      </Button>
                    )}
                  </Subscribe>
                )}
              </Subscribe>
              <Button.Or/>
              <Subscribe to={[CartState]}>
                {(cartState: CartState) => (
                  <Button
                    icon
                    labelPosition="right"
                    onClick={() => cartState.addToCart({
                      id: album.product.id,
                      album,
                      price: album.product.price
                    })}
                    disabled={cartState.isInCart(album.product.id)}
                  >
                    <Icon name="shopping basket" color="black"/>
                    Add to cart
                    <span style={{ marginLeft: 5, marginRight: 5 }} />
                    <BedragWaarde
                      bedrag={album.product.price}
                      valuta={Valuta.Dollar}
                      geenTeken
                      toonMutatie={false}
                    />
                  </Button>
                )}
              </Subscribe>
            </Button.Group>
          </div>
        </div>
      )
    )
  };
}

export default withStyles(albumDetailStyle)(ArtistDetail);
