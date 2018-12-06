import * as React from 'react';
import { RouteProps } from 'react-router';
import RegisterDetail from '../../views/auth/register/RegisterDetail';

interface IProps extends RouteProps { }
interface IState { }

class RegisterContainer extends React.Component<IProps, IState> {
    public state = {};

    public render() {
        return (
            <RegisterDetail />
        );
    }
};

export default RegisterContainer;
