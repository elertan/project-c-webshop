import * as React from 'react';
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import AlbumCover from "../../reusable/AlbumCover/AlbumCover";
import {Grid} from "semantic-ui-react";
import AppLayout from "../../layout/AppLayout/AppLayout";
import AlbumCoverPlaceholder from "../../reusable/AlbumCover/AlbumCoverPlaceholder";
import * as InfiniteScroller from "react-infinite-scroller";

interface IProps {
  loading: boolean;
  data: any;
  fetchMore: () => void;
  error: any;
}

const query = gql`
  query ExploreAlbums($cursor: String!){
    albums(first: 20, after: $cursor) {
      items {
        id
        name
        images(orderBy: {
          path: "height"
        }) {
          items {
            url
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const Explore: React.FunctionComponent<IProps> = (props: IProps) => {

  return (
    <AppLayout>
      {(() => {
        if (props.loading) {
          return (
            <Grid
              columns={5}
              doubling
            >
              {Array.from({length: 30}).map((_, i) => (
                <Grid.Column key={i}>
                  <AlbumCoverPlaceholder/>
                </Grid.Column>
              ))}
            </Grid>
          );
        }
        if (props.error) {
          return <p>{props.error.message}</p>;
        }

        const albums = props.data.items as any[];

        return (
          <InfiniteScroller
            pageStart={0}
            loadMore={props.fetchMore}
            hasMore={props.data.pageInfo.hasNextPage}
            loader={<span/>}
          >
            <Grid
              columns={5}
              doubling
            >
              {albums.map((album) => (
                <Grid.Column key={album.id}>
                  <AlbumCover
                    id={album.id}
                    name={album.name}
                    imageSource={album.images.items}
                  />
                </Grid.Column>
              ))}
            </Grid>
          </InfiniteScroller>
        );
      })()}
    </AppLayout>
  );
};

const withQuery = graphql(query, {
  options: () => ({
    variables: {
      cursor: "0"
    }
  }),
  props: data => ({
    data: {
      ...data.data,
      fetchMore: () => data.data!.fetchMore({
        variables: {
          cursor: `${Number((data.data! as any).albums.pageInfo.endCursor) + 1}`
        },
        updateQuery: ((previousQueryResult, options) => {
          const previousResult = previousQueryResult || {};
          const previousQuery = previousResult.albums || {};
          const currentQuery = options.fetchMoreResult.albums || {};
          const previousItems = previousQuery.items || [];
          const currentItems = currentQuery.items || [];

          return {
            ...previousResult,
            albums: {
              ...previousQuery,
              items: [...previousItems, ...currentItems],
              pageInfo: currentQuery.pageInfo,
            },
          };
        })
      })
    }
  })
});

export default withQuery((props: any) => {
  return Explore({
    loading: props.data.loading,
    data: props.data.albums,
    fetchMore: props.data.fetchMore,
    error: props.data.error
  });
});
