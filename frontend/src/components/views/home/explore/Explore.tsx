import * as React from 'react';
import './Explore.css';
import HomeLayout from "../../layout/HomeLayout/HomeLayout";
import AlbumGrid from "../../reusable/AlbumGrid/AlbumGrid";
import IAlbumGridData from "../../reusable/AlbumGrid/IAlbumGridData";

interface IProps {
}

const Explore: React.SFC<IProps> = (props: IProps) => {
  return (
    <HomeLayout>
      <div className="Explore-root">
        <AlbumGrid data={new Array(20).fill(null).map(() => ({
          name: "Promises (with Sam Smith)",
          imageSource: "https://i.scdn.co/image/b0875765de11e1b6bdfbdd07c2de72e65c02f524"
        }) as IAlbumGridData)} />
      </div>
    </HomeLayout>
  );
};

export default Explore;
