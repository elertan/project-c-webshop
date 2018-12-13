import * as React from 'react';
import {Link} from 'react-router-dom';
import {Button, Icon} from "semantic-ui-react";
import {Subscribe} from "unstated";
import MusicPlayerState from "../../../../states/MusicPlayerState";
import {getTrackTimeFromDurationMs} from "../../../../utils/time";
import CartState from "src/states/CartState";
import ITrack from 'src/models/ITrack';
import WishlistState from "../../../../states/WishlistState";
import ExplicitBadge from "./ExplicitBadge";

interface IProps {
  data: ITrack;
  noFavoriteAndCart?: boolean;
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
          <span>{aName}<br/></span>
        </Link>
      )
    });

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
            {!this.props.noFavoriteAndCart &&
              <>
                <Subscribe to={[CartState]}>
                  {(cartState: CartState) => (
                    <Subscribe to={[WishlistState]}>
                      {(wishlistState: WishlistState) => (
                        <Button
                          icon
                          disabled={wishlistState.isInWishlist(this.props.data.id) || cartState.isInCart(this.props.data.id)}
                          onClick={() => wishlistState.addToWishlist({
                            track: this.props.data,
                            id: this.props.data.id,
                            price: this.props.data.price
                          })}>
                          <Icon name="heart" color="red"/>
                        </Button>
                      )}
                    </Subscribe>
                  )}
                </Subscribe>
                <Subscribe to={[CartState]}>
                  {(cartState: CartState) => (
                    <Button icon
                            onClick={() => cartState.addToCart({
                              id: this.props.data.id,
                              track: this.props.data,
                              price: this.props.data.price
                            })}
                            disabled={cartState.isInCart(this.props.data.id)}
                    >
                      <Icon name="shopping cart" color="black"/>
                      &nbsp;
                      <span style={{ fontSize: 12 }}>
                    $ {this.props.data.price}
                  </span>
                    </Button>
                  )}
                </Subscribe>
              </>
            }
          </Button.Group>
        </td>
        <td style={{ paddingLeft: 5 }}>
          <span style={{ float: 'left' }}>
            {title}
          </span>
          {this.props.data.explicit &&
            <span style={{ float: 'right', marginRight: 15 }}>
              <ExplicitBadge />
            </span>
          }
        </td>
        <td>{artistNameSeparate}</td>
        <td>
          <Link to={`/album/${albumId}`}>
            <span>{albumsName}</span>
          </Link>
        </td>
        <td>{trackTime}</td>
      </tr>
    );
  }

  private handlePreviewClick = (musicPlayerState: MusicPlayerState) => () => {
    musicPlayerState.startNew(this.props.data.previewUrl!, this.props.data.title, 30000);
  };

}

export default TrackRow;
