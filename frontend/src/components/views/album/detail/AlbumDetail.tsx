import * as React from "react";
import albumDetailStyle, {StyleProps} from "./AlbumDetailStyle";
import TrackList from "../../reusable/TrackList/TrackList";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {ITrackData} from "../../reusable/TrackRow/TrackRow";
import AppLayout from "../../layout/AppLayout/AppLayout";
import {withStyles} from "@material-ui/core";
import CartState from "src/states/CartState";
import {Subscribe} from "unstated";
import IProduct from "src/models/IProduct";
import {Button, Icon} from "semantic-ui-react";
import IAlbum from "../../../../models/IAlbum";

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
              name
              durationMs
              artists {
                items {
                  name
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

    const data: ITrackData[] = album.tracks.items.map(
      (track: any) =>
        ({
          title: track.name,
          artistName: track.artists.items.map((artist: any) => artist.name).join(", "),
          albumsName: album.name,
          albumId: album.id,
          previewUrl: "NO_IMAGE",
          durationMs: track.durationMs
        } as ITrackData)
    );

    const allArtistNamesWithDuplicates = album.tracks.items.map(
      (track: any) => track.artists.items.map((artist: any) => artist.name)
    ).reduce((prev: string[], curr: string[]) => [...prev, ...curr]);
    const allArtistNames = allArtistNamesWithDuplicates.filter((artistName: string, i: number) => {
      return allArtistNamesWithDuplicates.indexOf(artistName) === i;
    });
    const allArtistNamesStr = allArtistNames.join(", ");

    return (
      <div style={{ marginTop: 50 }}>
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
          <Button icon labelPosition="left">
            <Icon name="heart" color="red" />
            Add to wishlist
          </Button>
        </div>


        <TrackList trackData={data}/>
      </div>
    );
  };

  private addToCart = (cartState: CartState, album: IAlbum, productId: number) => () => {
    const product: IProduct = {
      id: productId,
      album
    };
    cartState.setState({products: [...cartState.state.products, product]});
  };
}

export default withStyles(albumDetailStyle)(AlbumDetail);
