import IUser from "../models/IUser";
import {Container} from "unstated";

interface IState {
  user: IUser | null;
}

const userKey = "USER";

const initialState: IState = {
  user: (() => {
    const storageData = localStorage.getItem(userKey);
    if (storageData !== null) {
      return JSON.parse(storageData) as IUser;
    }
    return null;
  })()
};

class UserState extends Container<IState> {
  public state = initialState;

  public setUser = (user: IUser) => {
    this.setState({ user });
    localStorage.setItem(userKey, JSON.stringify(user));
  };

  public logout = () => {
    this.setState({ user: null });
    localStorage.removeItem(userKey);
  };
}

export default UserState;
