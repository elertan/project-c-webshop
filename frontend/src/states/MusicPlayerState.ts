import {Container} from "unstated";

interface IState {
  source: string | null;
  name: string | null;
  isPlaying: boolean;
}

const defaultState: IState = {
  source: null,
  name: null,
  isPlaying: false
};

class MusicPlayerState extends Container<IState> {
  public state = defaultState;

  public startNew = (source: string, name: string) => {
    this.setState({source, name, isPlaying: true});
  };

  public reset = () => {
    this.setState(defaultState);
  };
}

export default MusicPlayerState;
