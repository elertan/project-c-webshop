import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import ArtistDetailContainer from "../components/containers/artist/ArtistDetailContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";

interface IProps extends RouteComponentProps<{}> {}

const ArtistRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/:id`} component={ArtistDetailContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default ArtistRouter;
