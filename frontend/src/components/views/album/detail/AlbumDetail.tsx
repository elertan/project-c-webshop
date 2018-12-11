import * as React from "react";
import albumDetailStyle, {StyleProps} from "./AlbumDetailStyle";
import TrackList from "../../reusable/TrackList/TrackList";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import AppLayout from "../../layout/AppLayout/AppLayout";
import {withStyles} from "@material-ui/core";
import CartState from "src/states/CartState";
import {Subscribe} from "unstated";
import {Button, Icon} from "semantic-ui-react";
import WishlistState from "src/states/WishlistState";
import ITrack from "../../../../models/ITrack";

interface IProps extends StyleProps {
  albumId: number;
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

class AlbumDetail extends React.Component<IProps> {
  public render() {
    const query = gql`
    {
      albums (ids: "${this.props.albumId}") {
        items {
          name
          id
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
                price
              }
            }
          }
          product {
            id
            price
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
            return <div>{this.renderDetail(data.albums.items[0])}</div>;
          }}
        </Query>
      </AppLayout>
    );
  }

  private renderDetail = (album: any) => {
    const classes = this.props.classes!;

    const data: ITrack[] = album.tracks.items.map(
      (track: any) =>
        ({
          id: track.id,
          title: track.name,
          artistName: track.artists.items.map((artist: any) => artist.name),
          artistId: track.artists.items.map((artist: any) => artist.id),
          albumsName: album.name,
          albumId: album.id,
          previewUrl: track.previewUrl,
          durationMs: track.durationMs,
          explicit: track.explicit,
          price: track.product.price
        } as ITrack)
    );

    const allArtistNamesWithDuplicates = album.tracks.items.map(
      (track: any) => track.artists.items.map((artist: any) => artist.name)
    ).reduce((prev: string[], curr: string[]) => [...prev, ...curr]);
    const allArtistNames = allArtistNamesWithDuplicates.filter((artistName: string, i: number) => {
      return allArtistNamesWithDuplicates.indexOf(artistName) === i;
    });
    const allArtistNamesStr = allArtistNames.join(", ");

    return (
      <div style={{marginTop: 50}}>
        <div
          className={classes.albumContainerBackground}
          style={{backgroundImage: `url(${album.images.items[0].url})`}}
        />
        <div className={classes.albumInnerContainerDarkenLayer}/>
        <div className={classes.albumContainer}>
          <div className={classes.albumInnerContainer}>
            <img className={classes.image} src={album.images.items[0].url}/>
            <div className={classes.title}>{album.name}</div>
            <div className={classes.artistsText}>{allArtistNamesStr}</div>
          </div>
        </div>

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
                        album
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
                    album
                  })}
                  disabled={cartState.isInCart(album.product.id)}
                >
                  <Icon name="shopping basket" color="black"/>
                  Add to cart
                  <span style={{ marginLeft: 5, marginRight: 5 }} />
                  <span style={{ fontSize: 12 }}>
                     $ {album.product.price}
                    </span>
                </Button>
              )}
            </Subscribe>
          </Button.Group>
        </div>
        <TrackList trackData={data}/>
      </div>
    );
  };
}

export default withStyles(albumDetailStyle)(AlbumDetail);
