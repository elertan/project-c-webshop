import {gql} from "apollo-boost";

export const generateSearchForQuery = (keyword: string) => {
  const queryStr = keyword.trim();

  const q = gql`
    {
  searchFor(query: "${queryStr}") {
    categories {
      id
      name
      images(orderBy: {path: "height"}, first: 1) {
        items {
          url
        }
      }
    }
    albums {
      id
      name
      images(orderBy: {path: "height"}, first: 1) {
        items {
          url
        }
      }
      product {
        id
        price
      }
    }
    tracks {
      id
      name
      albums(first: 1) {
        items {
          id
          images(orderBy: {path: "height"}, first: 1) {
            items {
              url
            }
          }
        }
      }
      product {
        id
        price
      }
    }
    artists {
      id
      name
      images(orderBy: {path: "height"}, first: 1) {
        items {
          url
        }
      }
    }
  }
}
  `;

  return q;
};
