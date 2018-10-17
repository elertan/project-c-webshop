import * as React from 'react';
import Genres from "../../../views/home/genres/Genres";

interface IProps {}
interface IState {}

class GenresContainer extends React.Component<IProps, IState> {
    public state = {};

    public render() {
        return (
            <Genres/>
        );
    }
};

export default GenresContainer;
