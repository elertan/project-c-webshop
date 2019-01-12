import * as React from "react";
import { RouteProps } from "react-router";
import AddTrack from "../../../../views/dashboard/admin/adminComponents/tracks/AddTrack";

interface IProps extends RouteProps { }
interface IState { }

class AddTrackContainer extends React.Component<IProps, IState> {
    public state = {};

    public render() {
        return <AddTrack />;
    }
}

export default AddTrackContainer;
