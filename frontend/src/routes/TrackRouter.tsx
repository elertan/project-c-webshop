import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import DetailContainer from "../components/containers/album/DetailContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";

interface IProps extends RouteComponentProps<{}> {}

const TrackRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/:id`} component={DetailContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default TrackRouter;
