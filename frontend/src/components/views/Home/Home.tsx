import * as React from 'react';
import './Home.css';

interface IProps {}

const Home: React.SFC<IProps> = (props: IProps) => {
  return (
    <div className="Home">
      <p className="Home-Title">Project 5: Webshop</p>
    </div>
  );
}

export default Home;
