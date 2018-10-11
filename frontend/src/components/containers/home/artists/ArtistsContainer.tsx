import * as React from 'react';
import Artists from "../../../views/home/artists/Artists";

interface IProps {}
interface IState {}

class ArtistsContainer extends React.Component<IProps, IState> {
    public state = {};

    public render() {
        return (
            <Artists/>
        );
    }
};

export default ArtistsContainer;