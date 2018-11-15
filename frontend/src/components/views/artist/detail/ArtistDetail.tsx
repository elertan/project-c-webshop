import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import AppLayout from "../../layout/AppLayout/AppLayout";
import { StyleProps } from "../../album/detail/AlbumDetailStyle";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
import ArtistCover from "../../reusable/ArtistCover/ArtistCover";
import TrackList from "../../reusable/TrackList/TrackList";
import ITrack from "src/models/ITrack";
// import AlbumDetail from "../../album/detail/AlbumDetail";
// import albumDetailStyle, { StyleProps } from "./AlbumDetailStyle";
// import TrackList from "../../reusable/TrackList/TrackList";
// import {ITrackData} from "../../reusable/TrackRow/TrackRow";
// import {withStyles} from "@material-ui/core";
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
                       
                        return (
                            <div>{this.renderArtistDetail(artistData)}</div>
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
                <div key={i}>
                  <h1>{artist.name}</h1>
                  <ArtistCover 
                    name={artist.name}
                    imageSource={artist.images.items}
                    id={artist.id} />
                  <h3>Album {i + 1}</h3>
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

export default ArtistDetail;
