import IUser from "../models/IUser";
import {Container} from "unstated";
import {apolloClient, wishlistState} from "../index";
import {gql} from "apollo-boost";
import IProduct from "../models/IProduct";

interface IState {
  user: IUser | null;
}

const userKey = "USER";

const getStoredUser = () => {
  const storageData = localStorage.getItem(userKey);
  if (storageData !== null) {
    return JSON.parse(storageData) as IUser;
  }
  return null;
}

const FETCH_WISHLIST_QUERY = gql`
  query x($token: String!){
    me(token: $token) {
      user {
        email
      }
      wishlist {
        id
        price
        album {
          id
          name
          images(orderBy: { path: "height" }) {
            items {
              id
              url
            }
          }
        }
        track {
          id
          name
          albums(first: 1) {
            items {
              id
              images(orderBy: { path: "height" }) {
                items {
                  id
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

class UserState extends Container<IState> {
  public state = {
    user: getStoredUser()
  };

  constructor() {
    super();

    if (this.state.user === null) {
      return;
    }
    this.login(this.state.user);
  }


  public login = async (user: IUser) => {
    await this.setState({user});
    localStorage.setItem(userKey, JSON.stringify(user));
    // We might want to merge the wishlist
    await this.updateWishlistState();
  };

  public logout = async () => {
    await this.setState({user: null});
    localStorage.removeItem(userKey);

    wishlistState.setAnonymousWishlist();
  };

  private updateWishlistState = async () => {
    const user = this.state.user! as IUser;
    const result = await apolloClient.query({
      query: FETCH_WISHLIST_QUERY,
      variables: {
        token: user!.token
      }
    });
    const data = result.data! as any;
    const wishlist = data.me.wishlist.map((product: any) => {
      if (!product.track) {
        return product;
      }
      return {
        ...product,
        track: {
          ...product.track,
          images: product.track.albums.items[0].images.items
        }
      }
    }) as IProduct[];
    wishlistState.setUserWishlist(wishlist, user);
  };
}

export default UserState;
