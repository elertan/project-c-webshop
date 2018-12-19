import * as React from "react";
import { RouteProps } from "react-router";
import AddUser from "../../../../views/dashboard/admin/adminComponents/users/AddUser";

interface IProps extends RouteProps {}
interface IState {}

class AddUserContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return <AddUser />;
  }
}

export default AddUserContainer;
