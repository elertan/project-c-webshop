import * as React from 'react';
import {Search} from "semantic-ui-react";
import {withApollo, WithApolloClient} from "react-apollo";
import {useState} from "react";
import Timeout = NodeJS.Timeout;
import {generateSearchForQuery} from "../../../../../utils/queries";
import {searchState} from "../../../../../index";
import {Subscribe} from "unstated";
import SearchState from "../../../../../states/SearchState";

interface IProps extends Partial<WithApolloClient<{}>> {
}

const searchDelay = 500;
let timeoutId: Timeout | undefined;

const CustomSearch: React.FunctionComponent<IProps> = (props: IProps) => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <Subscribe to={[SearchState]}>
      {() => (
        <Search
          fluid
          loading={isSearching}
          value={searchState.state.keyword}
          results={searchState.state.results}
          category
          onSearchChange={(ev, data) => {
            const newKeyword = data.value || '';
            searchState.setResult(newKeyword, searchState.state.results);

            if (timeoutId !== undefined) {
              clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(async () => {
              setIsSearching(true);

              const result = await props.client!.query({
                query: generateSearchForQuery(newKeyword)
              });

              const searchFor = (result.data! as any).searchFor;
              const tracks = searchFor.tracks ?
                {
                  name: "Tracks",
                  results: searchFor.tracks.map((track: any) => ({
                    title: track.name,
                    image: track.albums.items[0].images.items[0].url,
                    price: `$${track.product.price}`
                  }))
                }
                :
                undefined;
              const albums = searchFor.albums ?
                {
                  name: "Albums",
                  results: searchFor.albums.map((album: any) => ({
                    title: album.name,
                    image: album.images.items[0].url,
                    price: `$${album.product.price}`
                  }))
                }
                :
                undefined;
              const artists = searchFor.artists ?
                {
                  name: "Artists",
                  results: searchFor.artists.map((artist: any) => ({
                    title: artist.name,
                    image: artist.images.items.length > 0 && artist.images.items[0].url
                  }))
                }
                :
                undefined;
              const categories = searchFor.categories ?
                {
                  name: "Categories",
                  results: searchFor.categories.map((category: any) => ({
                    title: category.name,
                    image: category.images.items[0].url
                  }))
                }
                :
                undefined;

              const searchData = {
                tracks,
                albums,
                artists,
                categories
              };
              Object.keys(searchData).forEach((key) => {
                if (result[key] === undefined) {
                  delete result[key];
                }
              });

              searchState.setResult(searchState.state.keyword, searchData);

              setIsSearching(false);
            }, searchDelay);
          }}
        />
      )}
    </Subscribe>
  );
};

export default withApollo(CustomSearch);
