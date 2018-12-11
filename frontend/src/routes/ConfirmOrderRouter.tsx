import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";

import NotFound from "../components/views/errors/NotFound/NotFound";
import ConfirmOrderContainer from 'src/components/containers/home/ConfirmOrderContainer';




interface IProps extends RouteComponentProps<{}> {}

const ConfirmOrderRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}`} component={ConfirmOrderContainer} />
      
      
      <Route component={NotFound} />
    </Switch>
  );
};

export default ConfirmOrderRouter;
