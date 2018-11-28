import * as React from 'react';
import RegisterDetail from '../../views/auth/register/RegisterDetail';

interface IProps{}
interface IState {}

class RegisterContainer extends React.Component<IProps, IState> {
    public render() {
        return (
            <RegisterDetail />
        )
    }
}

export default RegisterContainer;
