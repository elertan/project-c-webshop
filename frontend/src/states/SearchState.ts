import {Container} from "unstated";

interface IState {
  keyword: string;
  results: any;
}

const initialState: IState = {
  keyword: '',
  results: undefined
};

class SearchState extends Container<IState> {
  public state = initialState;

  public setResult = (keyword: string, results: any) => {
    this.setState({
      keyword,
      results
    });
  };
}

export default SearchState;
