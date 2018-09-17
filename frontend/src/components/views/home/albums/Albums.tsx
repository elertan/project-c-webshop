import * as React from 'react';
import './Albums.css';
import HomeLayout from "../../layout/HomeLayout/HomeLayout";
import album from "./album.jpg";

interface IProps {
}

const Album: React.SFC<IProps> = (props: IProps) => {
  return (
    <HomeLayout>
      <div className="Home">
        {new Array(20).fill(null).map((_, i) =>
          <img key={i} className="Home-Album" src={album} />
        )}
      </div>
    </HomeLayout>
  );
}

export default Album;
