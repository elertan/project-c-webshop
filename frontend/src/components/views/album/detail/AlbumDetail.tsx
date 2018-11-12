import * as React from 'react';
// import {Typography, withStyles} from '@material-ui/core';
// import Separator from '../../reusable/Separator';
import {StyleProps} from "./AlbumDetailStyle";
import TrackList from '../../reusable/TrackList/TrackList';

import gql from "graphql-tag";
import {Query} from "react-apollo";
import {ITrackData} from '../../reusable/TrackRow/TrackRow';
import AppLayout from "../../layout/AppLayout/AppLayout";

interface IProps extends StyleProps {
  albumId: number;
}

class AlbumDetail extends React.Component<IProps> {
  
  public render() {
    const query = gql`
    {
      albums (ids: "${this.props.albumId}") {
        items {
            name
            id
            tracks {
              items {
                name
                durationMs
                previewUrl
                artists {
                  items {
                    name
                  }
                }
              }
            }
            images(orderBy: {
                path: "height",
                descending: true    
            }, first: 1) {
                items {
                    url
                }
            }
        }
      }
    }
    `;

    return (
      <AppLayout>
        <Query query={query}>
          {({loading, error, data}) => {
            if (loading) {
              return null;
            }
            if (error) {
              return <span>{error.message}</span>;
            }
            return (             
              <div>
                {this.renderDetail(data.albums.items[0])}
              </div>
            )
          }}
        </Query>
      </AppLayout>
    );
  }

  private renderDetail = (album: any) => {
    // const classes = this.props.classes!;
    const ReturnTrackArtists = (track:any) => {
        const trackArtistNames: string[] = [];
        let countArtist = 0; 
        
        track.artists.items.forEach((artist: any) => {  
          countArtist++;
          countArtist > 1 ? (
            trackArtistNames.push(",  " + artist.name)
            ) : (
              trackArtistNames.push(artist.name)
            );
          // console.log("Artist number: " + countArtist + " is:" + artist.name + " with track: " + track.name)         
        })       
        return trackArtistNames;
    }  
      
    const data: ITrackData[] = album.tracks.items.map((track: any) => ({
       title: track.name, 
       artistName: ReturnTrackArtists(track),
       albumsName: album.name,
       albumId: album.id,
       previewUrl: track.previewUrl,
       durationMs: track.durationMs} as ITrackData)
    );
    return (
      <div>
        {/* <div
          className={classes.albumContainerBackground}
          style={{backgroundImage: `url(${album.imageUrl})`}}
        />
        <div className={classes.albumInnerContainerDarkenLayer}/> */}
        {/* <div
          className={classes.albumContainer}
        >
          <div className={classes.albumInnerContainer}>
            <img
              className={classes.image}
              src={album.imageUrl}
            />
            <div className={classes.title}>{album.name}</div>
            <div className={classes.artistsText}>ArtistName,ArtistName</div>
          </div>
        </div>
        <Separator horizontal/> */}
        <TrackList trackData={data}/>
      </div>
    );
  };
}

export default (AlbumDetail);
