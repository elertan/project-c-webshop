import * as React from 'react';
import AppLayout from "../../layout/AppLayout/AppLayout";

import gql from "graphql-tag";
import {Query} from "react-apollo";

interface IProps {
    artistId: number
}

class ArtistDetail extends React.Component<IProps> {
    public render() {
        const query = gql` {
            artists (ids: "${this.props.artistId}") {
                items {
                    name
                    id
                }
            }
        }`;
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
                            <h1>Artist Name: {data.artists.items[0].name}</h1>
                            <h1>Artist Id: {data.artists.items[0].id}</h1>
                        </div>
                        )
                    }}
                </Query>
        </AppLayout>
        )
    }
}

export default ArtistDetail;
