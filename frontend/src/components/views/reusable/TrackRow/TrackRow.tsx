import * as React from 'react';
import {Link} from 'react-router-dom';
import {Button, Icon} from "semantic-ui-react";
import {Subscribe} from "unstated";
import MusicPlayerState from "../../../../states/MusicPlayerState";
import {getTrackTimeFromDurationMs} from "../../../../utils/time";
import CartState from "src/states/CartState";
import ITrack from 'src/models/ITrack';
import IProduct from 'src/models/IProduct';
import WishlistState from "../../../../states/WishlistState";

interface IProps {
  data: ITrack;
}

const styles = {
  actionsTd: {}
};

class TrackRow extends React.Component<IProps> {
  
  public render() {
    const {title, durationMs, albumsName, artistName, artistId, albumId, previewUrl} = this.props.data;
    
    const artistNameSeparate = artistName.map((aName: string, i: number) => {
      return (
        <Link to={`/artist/${artistId[i]}`} key={artistId[i]}>
          <span key={i}>{aName}<br /></span>
        </Link>
      )
    })
    
    const trackTime = getTrackTimeFromDurationMs(durationMs);
    return (
      <tr>
        <td style={styles.actionsTd}>
          <Button.Group>
            <Subscribe to={[MusicPlayerState]}>
              {(musicPlayerState: MusicPlayerState) => (
                <Button
                  icon
                  disabled={previewUrl === null}
                  onClick={this.handlePreviewClick(musicPlayerState)}
                >
                  <Icon name="play" color="black"/>
                </Button>
              )}
            </Subscribe>
            <Subscribe to={[CartState]}>
              {cartState => (
                <Button icon 
                  onClick={this.addToCart(cartState, this.props.data, this.props.data.id)}
                  // Hier kan ik niet de "album" id gebruiken, maar er is geen "track" id.
                  // disabled={cartState.state.products.find((product: IProduct) => product.id === album.product.id) !== undefined}
                  >
                  <Icon name="shopping basket" color="black"/>
                </Button>
              )}
            </Subscribe>
            <Subscribe to ={[WishlistState]}>
            {(wishlistState: WishlistState) => (
              <Button 
              icon
              disabled = {wishlistState.state.products.find((product: IProduct) => product.id === this.props.data.id) !== undefined}
              onClick={this.addToWishlist(wishlistState, this.props.data, this.props.data.id)}>
              <Icon name="heart" color="red"/>
              </Button>
            )}
           </Subscribe>
          </Button.Group>
        </td>
        <td>{title}</td>
        <td>{artistNameSeparate}</td>
        <Link to={`/album/${albumId}`}>
          <td>{albumsName}</td>
        </Link>
        <td>{trackTime}</td>
      </tr>
    );
  }

  private addToCart = (cartState: CartState, track: ITrack, productId: number) => () => {
    const product: IProduct = {
      id: productId,
      track
    };
    cartState.setState({products: [...cartState.state.products, product]});
  };

  private handlePreviewClick = (musicPlayerState: MusicPlayerState) => () => {
    musicPlayerState.startNew(this.props.data.previewUrl!, this.props.data.title, 30000);
  };

  private addToWishlist = (wishlistState: WishlistState, track: ITrack, productId: number) => () => {
    const product: IProduct = {
      id: productId,
      track
    };
    wishlistState.setState({products: [...wishlistState.state.products, product]});
  };
}

export default TrackRow;
