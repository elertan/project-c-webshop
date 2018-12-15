import {Container} from 'unstated';
import IProduct from '../../src/models/IProduct';
import {apolloClient, userState} from "../index";
import {gql} from "apollo-boost";
import IUser from "../models/IUser";

enum EOperatingType {
  Anonymous,
  User
}

interface IState {
  products: IProduct[];
}
const localStorageKey = "WishlistState_state";
const rawData = localStorage.getItem(localStorageKey);
const initialState: IState = rawData ? JSON.parse(rawData) : {
  products: []
};

const MERGE_WISHLIST_QUERY = gql`
  mutation q($data: MergeWishlistInput!) {
    mergeWishlist(data: $data) {
      data
      errors {
        message
      }
    }
  }
`;

const ADD_TO_WISHLIST_QUERY = gql`
  mutation q($data: AddToWishlistInput!) {
    addToWishlist(data: $data) {
      data
      errors {
        message
      }
    }
  }
`;

const REMOVE_FROM_WISHLIST_QUERY = gql`
  mutation q($data: RemoveFromWishlistInput!) {
    removeFromWishlist(data: $data) {
      data
      errors {
        message
      }
    }
  }
`;

class WishlistState extends Container<IState> {
  public state = initialState;
  private operatingType: EOperatingType = EOperatingType.Anonymous;

  private customSetState = async (newState: IState) => {
    const promise = this.setState(newState);

    if (this.operatingType === EOperatingType.Anonymous) {
      localStorage.setItem(localStorageKey, JSON.stringify(newState));
    }

    return promise;
  };

  public addToWishlist = (product: IProduct) => {
    const products = [...this.state.products, product];
    this.customSetState({ products });
    if (this.operatingType === EOperatingType.User) {
      const user = userState.state.user! as IUser;
      // Sync with backend
      apolloClient.mutate({
        mutation: ADD_TO_WISHLIST_QUERY,
        variables: {
          data: {
            authToken: user.token,
            productId: product.id
          }
        }
      })
    }
  };

  public removeFromWishlist = (productId: number) => {
    const products = this.state.products.filter((p: IProduct) => p.id !== productId);
    this.customSetState({ products });
    if (this.operatingType === EOperatingType.User) {
      const user = userState.state.user! as IUser;
      // Sync with backend
      apolloClient.mutate({
        mutation: REMOVE_FROM_WISHLIST_QUERY,
        variables: {
          data: {
            authToken: user.token,
            productId
          }
        }
      })
    }
  };

  public isInWishlist = (productId: number) => {
    const product = this.state.products.find((p: IProduct) => p.id === productId);
    return product !== undefined;
  };

  public setUserWishlist = async (onlineProducts: IProduct[], user: IUser) => {
    this.operatingType = EOperatingType.User;
    localStorage.removeItem(localStorageKey);
    // Create new list, in distinct
    const newList = [...this.state.products, ...onlineProducts].filter((value, index, self) => self.indexOf(value) === index);
    this.setState({ products: newList });

    // Checks wether the the local wishlist contains any products that are not in the online wishlist
    const shouldBeMerged = this.state.products.filter(p => onlineProducts.findIndex(op => op.id === p.id) === -1).length > 0;
    if (!shouldBeMerged) {
      return;
    }
    apolloClient.mutate({
      mutation: MERGE_WISHLIST_QUERY,
      variables: {
        data: {
          authToken: user.token,
          localProducts: this.state.products.map(x => x.id)
        }
      }
    });
  };

  public setAnonymousWishlist = () => {
    this.operatingType = EOperatingType.Anonymous;
    this.customSetState({ products: [] });
  };
}

export default WishlistState;
