import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import CategoryDetailContainer from "../components/containers/category/CategoryDetailContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";

interface IProps extends RouteComponentProps<{}> {}

const CategoryRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}/:id`} component={CategoryDetailContainer} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default CategoryRouter;
