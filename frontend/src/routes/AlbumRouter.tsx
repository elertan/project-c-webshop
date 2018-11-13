import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import AlbumDetailContainer from "../components/containers/album/AlbumDetailContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";

interface IProps extends RouteComponentProps<{}> {}

const AlbumRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/:id`} component={AlbumDetailContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default AlbumRouter;
