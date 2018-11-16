import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import AppLayout from "../../layout/AppLayout/AppLayout";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
// import ArtistCover from "../../reusable/ArtistCover/ArtistCover";
import TrackList from "../../reusable/TrackList/TrackList";
import ITrack from "src/models/ITrack";
// import AlbumDetail from "../../album/detail/AlbumDetail";
import albumDetailStyle, { StyleProps } from "../../album/detail/AlbumDetailStyle";
import {withStyles} from "@material-ui/core";

// import CartState from "src/states/CartState";
// import {Subscribe} from "unstated";
// import IProduct from "src/models/IProduct";
// import {Button, Icon} from "semantic-ui-react";
// import IAlbum from "../../../../models/IAlbum";

interface IProps extends StyleProps {
    artistId: number
}

// const styles = {
//     actionsContainer: {
//         display: 'flex',
//         justifyContent: 'center',
//         marginBottom: 30,
//         padding: 20,
//         backgroundColor: 'rgb(243, 243, 243)'
//     }
// };

class ArtistDetail extends React.Component<IProps> {
    public render() {
        const query = gql`
        {
            artists (ids: "${this.props.artistId}") {
                items {
                    name
                    id
                    images(orderBy: {
                        path: "height",
                        descending: true
                    }, first: 1) {
                        items {
                            url
                        }
                    }
                    albums {
                        items {
                            id
                            name
                            tracks {
                                items {
                                  name
                                  durationMs
                                  artists {
                                    items {
                                      name
                                    }
                                  }
                                }
                              }
                              product {
                                id
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
            }
        }
        `;

        return (
            <AppLayout>
                <Query query={query}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return null;
                        }
                        if (error) {
                            return <span>{error.message}</span>;
                        }
                        const artistData = data.artists.items[0];
                        const albumsWithDuplicates = data.artists.items[0].albums.items;
                        const albumsFiltered= Array.from(new Set(albumsWithDuplicates))
                        artistData.albums.items = albumsFiltered;
                       
                        const classes = this.props.classes!;

                        return (
                            <div style={{ marginTop:50 }}>
                                <div
                                  className={classes.albumContainerBackground}
                                  style={{backgroundImage: `url(${artistData.images.items[0].url})`}}  
                                />          
                                <div className={classes.albumInnerContainerDarkenLayer}/>
                                    <div className={classes.albumContainer}>
                                      <div className={classes.albumInnerContainer}>
                                        <img className={classes.image} src={artistData.images.items[0].url}/>
                                      <div className={classes.title}>{artistData.name}</div>
                                    </div>
                                </div>
                                {this.renderArtistDetail(artistData)}
                            </div>
                        )
                    }}
                </Query>
            </AppLayout>
        );
    }

    private renderArtistDetail = (artist: any) => {
        // const classes = this.props.classes!;
        console.log(artist);
        
        const data: ITrack[] = artist.albums.items.map((album: any) =>
           album.tracks.items.map((track: any) => 
             ({
                title: track.name,
                artistName: track.artists.items.map((trackArtists: any) => trackArtists.name).join(', '),
                albumsName: album.name,
                albumId: album.id,
                previewUrl: track.previewUrl,
                durationMs: track.durationMs
              } as ITrack)
          ));

        const AllTrackData = data.map((trackData: any) => trackData)
          .reduce((prev: string[], curr: string[]) => [...prev, ...curr])

        return (
            artist.albums.items.map((album: any, i: number) =>
                <div key={i} style={{marginTop: 35}}>
                  <h2>Album {i + 1}: <h3>{album.name}</h3></h2>
                  <AlbumCover 
                    name={album.name}
                    imageSource={album.images.items}
                    id={album.id} />
                  <TrackList trackData={AllTrackData.filter((track:any) => track.albumId === album.id)} />
                </div>
            )
        )
    }
}

export default withStyles(albumDetailStyle)(ArtistDetail);
