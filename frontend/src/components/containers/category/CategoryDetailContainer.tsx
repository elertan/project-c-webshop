import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import CategoryDetail from '../../views/category/detail/CategoryDetail';

interface IRouteProps {
    id: string;
}

interface IProps extends RouteComponentProps<IRouteProps> {}

interface IState {}

class CategoryDetailContainer extends React.Component<IProps, IState> {
    public state = {};

    public render() {
        return (
            <CategoryDetail categoryId={Number(this.props.match.params.id)} />
        )
    }
}

export default CategoryDetailContainer;
