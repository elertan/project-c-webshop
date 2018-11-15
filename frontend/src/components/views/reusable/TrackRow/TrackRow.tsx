import * as React from 'react';
import {Link} from 'react-router-dom';
import {Button, Icon} from "semantic-ui-react";
import {Subscribe} from "unstated";
import MusicPlayerState from "../../../../states/MusicPlayerState";
import {getTrackTimeFromDurationMs} from "../../../../utils/time";
import CartState from "src/states/CartState";
import ITrack from 'src/models/ITrack';
import IProduct from 'src/models/IProduct';

export interface ITrackData {
  id: number;
  title: string;
  durationMs: number;
  index?: number;
  albumsName: string;
  artistName: string;
  albumId: number;
  previewUrl: string | null;
}

interface IProps {
  data: ITrackData;
}

const styles = {
  actionsTd: {}
};

class TrackRow extends React.Component<IProps> {

  public render() {
    const {title, durationMs, albumsName, artistName, albumId, previewUrl} = this.props.data;

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
            <Button icon><Icon name="heart" color="red"/></Button>
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
          </Button.Group>
        </td>
        <td>{title}</td>
        <td>{artistName}</td>
        <Link to={`/album/${albumId}`}>
          <td>{albumsName}</td>
        </Link>
        <td>{trackTime}</td>
      </tr>
    );
  }

  private addToCart = (cartState: CartState, trackData: ITrackData, productId: number) => () => {

    const track: ITrack = {
      id: trackData.id,
      name: trackData.title,
      // VRAAG!! Waar moet ik deze date's vandaan halen.
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const product: IProduct = {
      id: productId,
      track
    };
    cartState.setState({products: [...cartState.state.products, product]});
  };

  private handlePreviewClick = (musicPlayerState: MusicPlayerState) => () => {
    musicPlayerState.startNew(this.props.data.previewUrl!, this.props.data.title, 30000);
  };
}

export default TrackRow;
