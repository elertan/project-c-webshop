import * as React from "react";
import { RouteProps } from "react-router";
import AddAlbum from "../../../../views/dashboard/admin/adminComponents/albums/AddAlbum";

interface IProps extends RouteProps { }
interface IState { }

class AddAlbumContainer extends React.Component<IProps, IState> {
    public state = {};

    public render() {
        return <AddAlbum />;
    }
}

export default AddAlbumContainer;
