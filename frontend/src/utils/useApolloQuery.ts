import {ApolloClient, DocumentNode} from "apollo-boost";
import {useEffect, useState} from "react";
import {GraphQLError} from "graphql";

interface IState {
  loading: boolean;
  errors: GraphQLError[] | null;
  data: any | null;
}

const useApolloQuery = (client: ApolloClient<any>, query: DocumentNode, variables: any) => {
  const [state, setState] = useState({
    loading: true,
    errors: null,
    data: null
  } as IState);

  useEffect((async () => {
      const result = await client.query({
        query,
        variables
      });
      if (result.errors) {
        setState({
          ...state,
          loading: false,
          errors: result.errors
        });
      }
      setState({
        ...state,
        loading: false,
        data: result.data
      });
  }) as any, []);

  return state;
};

export default useApolloQuery;
