import * as React from 'react';
import {Subscribe} from "unstated";
import MusicPlayerState from "../../../../states/MusicPlayerState";
import {Container} from "semantic-ui-react";

interface IProps {}
interface IState {
  progress: number;
}

const styles = {
  root: {
    backgroundColor: 'rgb(240, 240, 240)'
  } as React.CSSProperties,
};

class MusicPlayer extends React.Component<IProps, IState> {
  public state = {
    progress: 0
  };
  private audioEl?: HTMLAudioElement;

  public render() {
    return (
      <Subscribe to={[MusicPlayerState]}>
        {this.renderWithMusicPlayerState}
      </Subscribe>
    );
  }

  public componentWillUnmount() {
    // Cleanup
    this.audioEl!.removeEventListener('timeupdate', this.updateProgress);
  }

  private renderWithMusicPlayerState = (musicPlayerState: MusicPlayerState) => {
    const { isPlaying, source, name } = musicPlayerState.state;

    return (
      <div style={styles.root}>
        <audio
          ref={this.audioElRefHandler}
          src={source || undefined}
          autoPlay={isPlaying}
        />
        <Container>
          {name} {this.state.progress}%
        </Container>
      </div>
    );
  };

  private audioElRefHandler = (ref: HTMLAudioElement | null) => {
    if (ref !== null) {
      this.audioEl = ref;
      ref.addEventListener('timeupdate', this.updateProgress);
    }
  };

  private updateProgress = () => {
    const duration = this.audioEl!.duration;
    const currentTime = this.audioEl!.currentTime;
    const progress = (currentTime * 100) / duration;

    this.setState({ progress });
  };
}

export default MusicPlayer;
