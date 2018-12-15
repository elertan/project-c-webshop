import * as React from 'react';
import { RouteProps } from "react-router";
import BirthReset from "../../../../../views/dashboard/user/accountDetails/birthReset/birthReset";

interface IProps extends RouteProps { }
interface IState { }

class BirthResetContainer extends React.Component<IProps, IState> {
    public state = {};

    public render() {
        return (
            <BirthReset />
        );
    }
};

export default BirthResetContainer;
