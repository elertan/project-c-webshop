import * as React from "react";
import AppLayout from "../../../layout/AppLayout/AppLayout";
import {Item, Header, Icon, Label} from "semantic-ui-react";
import DashboardMenu from "../../../reusable/DashboardMenu/DashboardMenu";
import {apolloClient, userState} from "../../../../../index";
import IUser from "../../../../../models/IUser";
import {gql} from "apollo-boost";
import useApolloQuery from "../../../../../utils/useApolloQuery";

const styles = {
  DashboardPositioning: {
    display: "inline-block",
    width: "60%",
    padding: "3%"
  },
  HeaderPositioning: {
    margin: "3% 0 0 0"
  }
};

const ORDER_QUERY = gql`
query x($token: String!) {
  me(token: $token) {
    orders {
      id
      createdAt
      products {
        id
        price
        album {
          name
          images(first: 1, orderBy: { path: "height" }) {
            items {
              url
            }
          }
        }
        track {
          name
          albums(first: 1) {
            items {
              images(first: 1, orderBy: { path: "height" }) {
                items {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const getProductNames = (products: any[]) => {
  return products.map(product => {
    if (product.track) {
      return product.track.name;
    }
    return product.album.name;
  });
};

const OrderHistory: React.FunctionComponent = () => {
  const user = userState.state.user! as IUser;
  const queryData = useApolloQuery(apolloClient, ORDER_QUERY, {
    token: user.token
  });

  return (
    <AppLayout>
      <div style={styles.HeaderPositioning}>
        <Header as="h2">
          <Icon name="send"/>
          <Header.Content>
            Order History
            <Header.Subheader>View your recent orders</Header.Subheader>
          </Header.Content>
        </Header>
      </div>
      <DashboardMenu/>
      <div style={styles.DashboardPositioning}>
        {(() => {
          if (queryData.loading) {
            return <span>Loading...</span>;
          }
          if (queryData.errors) {
            return <span>An error has occurred.</span>
          }
          const orders = queryData.data.me.orders as any[];
          return (
            <Item.Group divided>
              {orders.map((order) => {
                const firstProduct = order.products[0];
                let imageSrc = "";
                if (firstProduct.track) {
                  imageSrc = firstProduct.track.albums.items[0].images.items[0].url;
                } else {
                  imageSrc = firstProduct.album.images.items[0].url;
                }
                const productNames = getProductNames(order.products);
                return (
                  <Item key={order.id}>
                    <Item.Image
                      size="tiny"
                      src={imageSrc}
                    />
                    <Item.Content verticalAlign="middle">
                      On {order.createdAt} you bought&nbsp;
                      {productNames.map((name, i) => <Label key={i}>{name}</Label>).reduce((curr, next) => <span>{curr}, {next}</span>)}
                    </Item.Content>
                  </Item>
                );
              })}
            </Item.Group>
          );
        })()}
      </div>
    </AppLayout>
  );
};

export default OrderHistory;
