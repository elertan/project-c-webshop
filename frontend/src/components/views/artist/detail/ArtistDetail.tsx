import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import AppLayout from "../../layout/AppLayout/AppLayout";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
import TrackList from "../../reusable/TrackList/TrackList";
import ITrack from "src/models/ITrack";
import albumDetailStyle, { StyleProps } from "../../album/detail/AlbumDetailStyle";
import {withStyles} from "@material-ui/core";
import { Subscribe } from "unstated";
import { Button, Icon } from "semantic-ui-react";
import CartState from "src/states/CartState";
import IProduct from "src/models/IProduct";
import WishlistState from "src/states/WishlistState";
import IAlbum from "../../../../models/IAlbum";

interface IProps extends StyleProps {
    artistId: number
}

const styles = {
    actionsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 30,
        padding: 20,
        backgroundColor: 'rgb(243, 243, 243)'
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
                            url
                        }
                    }
                    albums {
                        items {
                            id
                            name
                            tracks {
                                items {
                                  id
                                  name
                                  durationMs
                                  previewUrl
                                  artists {
                                    items {
                                      name
                                      id
                                    }
                                  }
                                }
                              }
                        product {
                            id
                        }
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
                }
            }
        }
        `;

        return (
            <AppLayout>
                <Query query={query}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return null;
                        }
                        if (error) {
                            return <span>{error.message}</span>;
                        }
                        const artistData = data.artists.items[0];
                        const albumsWithDuplicates = data.artists.items[0].albums.items;
                        const albumsFiltered= Array.from(new Set(albumsWithDuplicates))
                        artistData.albums.items = albumsFiltered;
                       
                        const classes = this.props.classes!;

                        return (
                            <div style={{ marginTop:50 }}>
                                <div
                                  className={classes.albumContainerBackground}
                                  style={{backgroundImage: `url(${artistData.images.items[0].url})`}}  
                                />          
                                <div className={classes.albumInnerContainerDarkenLayer}/>
                                    <div className={classes.albumContainer}>
                                      <div className={classes.albumInnerContainer}>
                                        <img className={classes.image} src={artistData.images.items[0].url}/>
                                      <div className={classes.title}>{artistData.name}</div>
                                    </div>
                                </div>
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
                durationMs: track.durationMs
              } as ITrack)
          ));

        const AllTrackData = data.map((trackData: any) => trackData)
          .reduce((prev: string[], curr: string[]) => [...prev, ...curr])

        return (
            artist.albums.items.map((album: any, i: number) =>
                <div key={i} style={{marginTop: 35}}>
                    <div style={styles.actionsContainer}>
                        <Subscribe to={[WishlistState]}>
                            {wishlistState => (
                            <Button
                                icon
                                labelPosition="left"
                                onClick={this.addToWishlist(wishlistState, album, album.product.id)}
                                disabled={wishlistState.state.products.find((product: IProduct) => product.id === album.product.id) !== undefined}
                            >
                                <Icon name="heart" color="red" />
                                Add to wishlist
                            </Button>
                            )}
                        </Subscribe>
                        <Subscribe to={[CartState]}>
                            {cartState => (
                            <Button
                                icon
                                labelPosition="left"
                                onClick={this.addToCart(cartState, album, album.product.id)}
                                disabled={cartState.state.products.find((product: IProduct) => product.id === album.product.id) !== undefined}
                            >
                                <Icon name="shopping basket" color="black" />
                                Add to cart
                            </Button>
                            )}
                        </Subscribe>
                    </div>
                  <h2>Album {i + 1}: <h3>{album.name}</h3></h2>
                  <AlbumCover 
                    name={album.name}
                    imageSource={album.images.items}
                    id={album.id} />
                  <TrackList trackData={AllTrackData.filter((track:any) => track.albumId === album.id)} />
                </div>
            )
        )
    }
    private addToCart = (cartState: CartState, album: IAlbum, productId: number) => () => {
        const product: IProduct = {
          id: productId,
          album
        };
        cartState.setState({products: [...cartState.state.products, product]});
      };
      private addToWishlist = (wishlistState: WishlistState, album: IAlbum, productId: number) => () => {
        const product: IProduct = {
          id: productId,
          album
        };
        wishlistState.setState({products: [...wishlistState.state.products, product]});
      };
}

export default withStyles(albumDetailStyle)(ArtistDetail);
