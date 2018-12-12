import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps<{}> {}

class ScrollToTop extends React.Component<IProps> {
    public componentDidUpdate(prevProps: IProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }
    public render() {
        return (this.props.children);
    }
}

export default withRouter(ScrollToTop);
