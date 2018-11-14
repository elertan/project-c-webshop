import * as React from 'react';
import {Subscribe} from "unstated";
import MusicPlayerState from "../../../../states/MusicPlayerState";
import {Button, Container, Icon} from "semantic-ui-react";
import {getTrackTimeFromDurationMs} from "../../../../utils/time";

interface IProps {
}

interface IState {
  progress: number;
  source: string | null;
  playing: boolean;
  volume: number;
}

const styles = {
  root: {
    backgroundColor: 'rgb(240, 240, 240)',
    position: 'fixed',
    bottom: 0,
    padding: 3,
    left: 0,
    width: '100vw',
    zIndex: 2000
  } as React.CSSProperties,
};

class MusicPlayer extends React.Component<IProps, IState> {
  public state = {
    progress: 0,
    source: null,
    playing: false,
    volume: 50
  };
  private audioEl?: HTMLAudioElement;

  public render() {
    return (
      <>
        <audio
          ref={this.audioElRefHandler}
          src={this.state.source || undefined}
        />
        <Subscribe to={[MusicPlayerState]}>
          {this.renderWithMusicPlayerState}
        </Subscribe>
      </>
    );
  }

  public componentWillUnmount() {
    // Cleanup
    this.audioEl!.removeEventListener('timeupdate', this.updateProgress);
    this.audioEl!.removeEventListener('ended', this.handleAudioEnded);
  }

  private renderWithMusicPlayerState = (musicPlayerState: MusicPlayerState) => {
    const {name, source, durationMs} = musicPlayerState.state;
    if (source !== this.state.source) {
      const playing = Boolean(source);
      this.setState({source, progress: 0, playing},
        () => {
          if (playing) {
            this.audioEl!.play();
          }
        });
    }

    if (this.state.source === null) {
      return null;
    }

    const playButtonIconName = this.state.playing ? "pause" : "play";
    if (this.audioEl) {
      this.setVolume(this.state.volume);
    }


    return (
      <div style={styles.root}>
        <Container>
          <div style={{display: 'flex', alignItems: 'center', padding: 5}}>
            <div>
              <Button icon circular onClick={this.handleTogglePlayPause}>
                <Icon name={playButtonIconName} size="large"/>
              </Button>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flex: 1, marginLeft: 20, marginRight: 20}}>
              {this.renderProgress(this.state.progress, durationMs)}
            </div>
            <div>
              {this.renderVolumeDiv()}
            </div>
            <div style={{marginLeft: 10, marginRight: 10}}>
              {name}
            </div>
            <div style={{marginLeft: 20}}>
              <Button icon circular onClick={this.handleCloseClick(musicPlayerState)}>
                <Icon name="close"/>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  };

  private handleCloseClick = (musicPlayerState: MusicPlayerState) => () => {
    this.audioEl!.pause();
    musicPlayerState.reset();
  };

  private setVolume = (volumeLevel: number) => {
    const realVolume = volumeLevel === 0 ? 0 : Math.pow(volumeLevel / 100, 1.75);
    this.audioEl!.volume = realVolume;
  };

  private audioElRefHandler = (ref: HTMLAudioElement | null) => {
    if (ref !== null) {
      this.audioEl = ref;
      ref.addEventListener('timeupdate', this.updateProgress);
      ref.addEventListener('ended', this.handleAudioEnded)
      this.setVolume(this.state.volume);
    }
  };

  private handleAudioEnded = () => {
    this.setState({ playing: false, progress: 0});
    this.audioEl!.pause();
  };

  private handleTogglePlayPause = () => {
    if (!this.audioEl) {
      return;
    }
    if (this.state.playing) {
      this.audioEl!.pause();
    } else {
      this.audioEl!.play();
    }

    this.setState(prevState => ({playing: !prevState.playing}));
  };

  private updateProgress = () => {
    const duration = this.audioEl!.duration;
    const currentTime = this.audioEl!.currentTime;
    const progress = (currentTime * 100) / duration;

    this.setState({progress});
  };

  private renderProgress = (progress: number, durationMs: number | null) => {
    if (durationMs === null) {
      return null;
    }

    return (
      <>
        <p style={{margin: 0}}>{getTrackTimeFromDurationMs((progress / 100) * durationMs)}</p>
        <div style={{
          flex: 1,
          height: 1,
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: 'rgb(200, 200, 200)'
        }}>
          <div style={{backgroundColor: 'red', height: 1, width: `${progress}%`}}/>
        </div>
        <p>{getTrackTimeFromDurationMs(durationMs)}</p>
      </>
    );
  };

  private renderVolumeDiv = () => {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{marginRight: 5}}>
          <Icon name="volume down"/>
        </div>
        <input
          style={{width: 75}}
          type="range"
          min="0"
          max="100"
          value={this.state.volume}
          onChange={this.handleVolumeChange}
        />
        <div style={{marginLeft: 5}}>
          <Icon name="volume up"/>
        </div>
      </div>
    );
  };

  private handleVolumeChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({volume: Number(ev.target.value)})
  };
}

export default MusicPlayer;
