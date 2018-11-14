import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import AppLayout from "../../layout/AppLayout/AppLayout";
import { StyleProps } from "../../album/detail/AlbumDetailStyle";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
import TrackList from "../../reusable/TrackList/TrackList";
import {ITrackData} from "../../reusable/TrackRow/TrackRow";
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
                        return (
                            <div>{this.renderArtistDetail(data.artists.items[0])}</div>
                        )
                    }}
                </Query>
            </AppLayout>
        );
    }

    private renderArtistDetail = (artist: any) => {
        // const classes = this.props.classes!;
        console.log(artist);
        
        const data: ITrackData[] = artist.albums.items.map((album: any) =>
           album.tracks.items.map((track: any) => 
             ({
                title: track.name,
                artistName: track.artists.items.map((trackArtists: any) => trackArtists.name).join(', '),
                albumsName: album.name,
                albumId: album.id,
                previewUrl: "NO_IMAGE",
                durationMs: track.durationMs
              } as ITrackData)
          ));

        // console.log("data is: " + data);

        return (
            artist.albums.items.map((album: any, i: number) =>
              <div key={i}>
                <h3>Begin</h3>
                <AlbumCover 
                  name={album.name} 
                  imageSource={album.images.items[0].url}
                  id={album.id} />
                <TrackList trackData={data} />
                <h3>Eind</h3>
              </div>
            )  
        )
    }
}

export default ArtistDetail;
