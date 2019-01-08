import * as React from "react";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";
import NotFound from "../components/views/errors/NotFound/NotFound";
import AdminContainer from "../components/containers/dashboard/admin/Admin";

import ProductsContainer from "../components/containers/dashboard/admin/Products/ProductContainer";
import AllProductsContainer from "../components/containers/dashboard/admin/Products/AllProductsContainer";
import AddProductsContainer from "../components/containers/dashboard/admin/Products/AddProductsContainer";

import UserContainer from "../components/containers/dashboard/admin/Users/UserContainer";
import AllUsersContainer from "../components/containers/dashboard/admin/Users/AllUsersContainer";
import AddUserContainer from "../components/containers/dashboard/admin/Users/AddUserContainer";

import ArtistsContainer from "../components/containers/dashboard/admin/Artists/ArtistsContainer";

import StatisticsContainer from "../components/containers/dashboard/admin/Statistics/StatisticsContainer";
import {Subscribe} from "unstated";
import UserState from "../states/UserState";
import {userState} from "../index";
import IUser from "../models/IUser";
import AlbumXTrack from "../components/views/dashboard/admin/adminComponents/AlbumXTrack";

interface IProps extends RouteComponentProps<{}> {}

const AdminRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Subscribe to={[UserState]}>
        {() => {
          if (userState.state.user === null) {
            return <Redirect to={"/home/explore?authorize=admin&redirectTo=" + encodeURI(props.location.pathname)}/>;
          }
          const user = userState.state.user! as IUser;
          if (!user.isAdmin) {
            return <Redirect to={"/home/explore?authorize=admin&redirectTo=" + encodeURI(props.location.pathname)}/>;
          }

          return (
            <>
              <Route exact path={`/admin`} component={AdminContainer} />

              <Route exact path={`/admin/products`} component={ProductsContainer} />
              <Route exact path={`/admin/products/all`} component={AllProductsContainer} />
              <Route exact path={`/admin/products/addproduct`} component={AddProductsContainer} />

              <Route exact path={`/admin/users`} component={UserContainer} />
              <Route exact path={`/admin/users/all`} component={AllUsersContainer} />
              <Route exact path={`/admin/users/adduser`} component={AddUserContainer} />

              <Route exact path="/admin/albumxtrack" component={AlbumXTrack} />

              <Route exact path="/admin/artists" component={ArtistsContainer} />

              <Route exact path={`/admin/statistics`} component={StatisticsContainer} />
            </>
          );
        }}
      </Subscribe>
      <Route component={NotFound} />
    </Switch>
  );
};

export default AdminRouter;
