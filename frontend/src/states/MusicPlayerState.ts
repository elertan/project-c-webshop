import {Container} from "unstated";

interface IState {
  source: string | null;
  name: string | null;
  durationMs: number | null;
}

const defaultState: IState = {
  source: null,
  name: null,
  durationMs: null
};

class MusicPlayerState extends Container<IState> {
  public state = defaultState;

  public startNew = (source: string, name: string, durationMs: number) => {
    this.setState({source, name, durationMs});
  };

  public reset = () => {
    this.setState({...defaultState});
  };
}

export default MusicPlayerState;
