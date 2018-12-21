import * as React from 'react';
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";

import AcountDetailsContainer from "../components/containers/dashboard/user/accountDetails/accountDetailsContainer";
import PaymentMethodsContainer from "../components/containers/dashboard/user/paymentDetails/paymentDetailsContainer"
import OrderHistoryContainer from "../components/containers/dashboard/user/orderHistory/orderHistoryContainer";
import OverviewContainer from "../components/containers/dashboard/user/overview/overviewContainer";
import PasswordResetContainer from "../components/containers/dashboard/user/accountDetails/passwordReset/passwordResetContainer";
import PasswordResetSuccesContainer from "../components/containers/dashboard/user/accountDetails/passwordReset/passwordResetSuccesContainer";
import NameResetContainer from "../components/containers/dashboard/user/accountDetails/nameReset/nameResetContainer";
import BirthResetContainer from 'src/components/containers/dashboard/user/accountDetails/birthReset/birthResetContainer';
import EmailResetContainer from "../components/containers/dashboard/user/accountDetails/emailReset/emailResetContainer";
import NotFound from "../components/views/errors/NotFound/NotFound";
import {userState} from "../index";
import {Subscribe} from "unstated";
import UserState from "../states/UserState";


interface IProps extends RouteComponentProps<{}> {}

const DashboardRouter: React.SFC<IProps> = (props: IProps) => {
  return (
    <Switch>
      <Subscribe to={[UserState]}>
        {() => {
          // Don't make routes visible to guest users
          if (userState.state.user === null) {
            return <Redirect to={"/home/explore?authorize=user&redirectTo=" + encodeURI(props.location.pathname)}/>;
          }
          return (
            <>
              <Route exact path={`${props.match.url}/accountdetails`} component={AcountDetailsContainer} />
              <Route exact path={`${props.match.url}/orderhistory`} component={OrderHistoryContainer} />
              <Route exact path={`${props.match.url}/paymentmethods`} component={PaymentMethodsContainer} />
              <Route exact path={`${props.match.url}/overview`} component={OverviewContainer} />
              <Route exact path={`${props.match.url}/accountdetails/passwordreset`} component={PasswordResetContainer} />
              <Route exact path={`${props.match.url}/accountdetails/passwordresetsucces`} component={PasswordResetSuccesContainer} />
              <Route exact path={`${props.match.url}/accountdetails/namereset`} component={NameResetContainer} />
              <Route exact path={`${props.match.url}/accountdetails/birthreset`} component={BirthResetContainer} />
              <Route exact path={`${props.match.url}/accountdetails/emailreset`} component={EmailResetContainer} />
            </>
          );
        }}
      </Subscribe>

      <Route component={NotFound} />
    </Switch>
  );
};

export default DashboardRouter;
