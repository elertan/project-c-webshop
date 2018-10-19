import * as React from 'react';
import './Explore.css';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
import GridView from "../../reusable/GridView/GridView";
import AppLayout from "../../layout/AppLayout/AppLayout";
// import photo from './eminem.jpg';
// import {ITrackData} from '../../reusable/TrackRow/TrackRow';
//
// import TrackListExplore from '../../reusable/TrackList/TrackListExplore';

interface IProps {
}

const query = gql`
  {
    albums {
      id
      name
      imageUrl
    }
  }
`;
//
// const queryTracks = gql`
//     {
//         tracks {
//           name
//           durationMs
//           previewUrl
//           albums{
//            name
//            id
//           }
//           artists{
//             name
//           }
//         }
//       }
//     `;

const Explore: React.SFC<IProps> = (props: IProps) => {
  return (
    <AppLayout>
      <div className="Explore-root">
        {/*<div className="top">*/}
          {/*<img className="photo" src={photo} height="600" width="905"/>*/}
          {/*<div className="tracks">*/}
            {/*<Query query={queryTracks}>*/}
              {/*{(dataTracks) => {*/}
                {/*if (dataTracks.loading) {*/}
                  {/*return null;*/}
                {/*}*/}
                {/*if (dataTracks.error) {*/}
                  {/*return <span>{dataTracks.error.message}</span>;*/}
                {/*}*/}
                {/*const tracks = dataTracks.data.tracks;*/}

                {/*const tracksList: ITrackData[] = tracks.map((track: any, i: number) =>*/}
                  {/*({*/}
                    {/*title: track.name,*/}
                    {/*previewUrl: track.previewUrl,*/}
                    {/*albumId: track.albums[0].id,*/}
                    {/*durationMs: track.durationMs,*/}
                    {/*artistName: track.artists[0].name,*/}
                    {/*albumsName: track.albums[0].name,*/}
                    {/*index: i*/}
                  {/*} as ITrackData)*/}
                {/*);*/}
                {/*return (*/}
                  {/*<TrackListExplore trackData={tracksList}/>*/}
                {/*);*/}
              {/*}}*/}
            {/*</Query>*/}
          {/*</div>*/}
        {/*</div>*/}
        <div className="albums">
          <Query query={query}>
            {(data) => {
              if (data.loading) {
                return null;
              }
              if (data.error) {
                return <p>{data.error.message}</p>;
              }

              const albums = data.data.albums;
              const covers = (albums as any[]).map((album, i) =>
                <AlbumCover key={i} name={album.name} imageSource={album.imageUrl} id={album.id}/>
              );

              return <GridView elements={covers}/>;
            }}
          </Query>
        </div>
      </div>
    </AppLayout>
  );
};

export default Explore;
