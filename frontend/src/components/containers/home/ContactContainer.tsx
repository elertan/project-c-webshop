import * as React from "react";
import Contact from "../../views/home/Contact";

interface IProps {}
interface IState {}

class ContactContainer extends React.Component<IProps, IState> {
  public render() {
    return <Contact />;
  }
}

export default ContactContainer;
