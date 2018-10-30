import * as React from 'react';
import Categories from "../../../views/home/categories/Categories";

interface IProps {
}

interface IState {
}

class CategoriesContainer extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    return (
      <Categories/>
    );
  }
};

export default CategoriesContainer;
