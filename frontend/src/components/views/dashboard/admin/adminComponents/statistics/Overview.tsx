import * as React from "react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import { Header, Label, Grid, Divider } from "semantic-ui-react";
import {
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const AmountOfUsersQuery = gql`
  {
    users {
      totalCount
    }
  }
`;

const styles = {
  centerItems: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center"
  },
  centerItemsQuery: {
    marginTop: 30,
    display: "flex",
    paddingLeft: "10vw"
  },

  centerItemsGrid: {
    marginTop: 30,
    width: "70vw",
    display: "flex",
    justifyContent: "left"
  }
};

class Statistics extends React.Component {
  public render() {
    const dataGeneral = [
      {
        Month: "January",
        "Account registrations": 12,
        Profit: 2400,
        Albums: 1400,
        Singles: 5400
      },
      {
        Month: "February",
        "Account registrations": 17,
        Profit: 1400,
        Albums: 2200,
        Singles: 3200
      },
      {
        Month: "March",
        "Account registrations": 14,
        Profit: 9800,
        Albums: 2900,
        Singles: 4100
      },
      {
        Month: "April",
        "Account registrations": 19,
        Profit: 3900,
        Albums: 2000,
        Singles: 6700
      },
      {
        Month: "May",
        "Account registrations": 26,
        Profit: 5000,
        Albums: 2100,
        Singles: 7900
      },
      {
        Month: "June",
        "Account registrations": 2,
        Profit: 4000,
        Albums: 2500,
        Singles: 1200
      }
    ];
    const dataAccountRegistrations = [
      {
        Month: "January",
        "Account registrations": 12,
        Total: 12
      },
      {
        Month: "February",
        "Account registrations": 17,
        Total: 29
      },
      {
        Month: "March",
        "Account registrations": 14,
        Total: 43
      },
      {
        Month: "April",
        "Account registrations": 19,
        Total: 52
      },
      {
        Month: "May",
        "Account registrations": 26,
        Total: 78
      },
      {
        Month: "June",
        "Account registrations": 2,
        Total: 0
      }
    ];
    return (
      <div>
        <AdminMenu />
        <div style={styles.centerItems}>
          <div style={styles.centerItems}>
            <div>
              <Header as="h2" textAlign="center">
                <Header.Content>Account registrations</Header.Content>
                <Header.Subheader>
                  The amount of registrations for each month
                </Header.Subheader>
                <Label color="red">
                  You had 17 less registrations than last month
                </Label>
              </Header>
              <AreaChart width={400} height={175} data={dataGeneral}>
                <defs>
                  <linearGradient id="colorAC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="Month" />
                <YAxis />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Account registrations"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorAC)"
                />
              </AreaChart>
            </div>
          </div>
          <div style={styles.centerItems}>
            <div>
              <Header as="h2" textAlign="center">
                <Header.Content>Profit</Header.Content>
                <Header.Subheader>
                  The total amount of profit for each month
                </Header.Subheader>
                <Label color="red">
                  You made 20% less profit than last month
                </Label>
              </Header>
              <AreaChart width={450} height={175} data={dataGeneral}>
                <XAxis dataKey="Month" />
                <YAxis />
                <CartesianGrid strokeDasharray="5 5" />
                <defs>
                  <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Profit"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorP)"
                />
              </AreaChart>
            </div>
          </div>

          <div style={styles.centerItems}>
            <div>
              <Header as="h2" textAlign="center">
                <Header.Content>Albums and singles</Header.Content>
                <Header.Subheader>
                  The amount of albums and singles sold each month
                </Header.Subheader>
                <Label color="green">
                  You sold 400 more albums than last month
                </Label>

                <Label color="red">
                  You sold 6700 less singles than last month
                </Label>
              </Header>
              <AreaChart width={400} height={175} data={dataGeneral}>
                <defs>
                  <linearGradient id="colorS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="Month" />
                <YAxis />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Albums"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorA)"
                />
                <Area
                  type="monotone"
                  dataKey="Singles"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorS)"
                />
              </AreaChart>
            </div>
          </div>
        </div>
        <Divider style={{ paddingTop: "3vw" }} horizontal>
          scroll for more statistics
        </Divider>
        <div style={styles.centerItems}>
          <div style={styles.centerItemsGrid}>
            <Grid columns="equal" padded>
              <Grid.Row>
                <Grid.Column>
                  <BarChart
                    width={600}
                    height={300}
                    data={dataAccountRegistrations}
                  >
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="Month" />
                    <YAxis />
                    <Tooltip />
                    <Bar stackId="a" fill="#8884d8" dataKey="Total" />
                    <Bar
                      stackId="a"
                      fill="#82ca9d"
                      dataKey="Account registrations"
                    />
                  </BarChart>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2" textAlign="center">
                    <Header.Content>User registrations</Header.Content>
                  </Header>

                  <Query query={AmountOfUsersQuery}>
                    {data => {
                      if (data.loading) {
                        return null;
                      }
                      if (data.error) {
                        return <p>{data.error.message}</p>;
                      }
                      return (
                        <div style={styles.centerItemsQuery}>
                          <Label size="big" basic color="teal">
                            Total amount of users = {data.data.users.totalCount}
                          </Label>
                        </div>
                      );
                    }}
                  </Query>
                  <Query query={AmountOfUsersQuery}>
                    {data => {
                      if (data.loading) {
                        return null;
                      }
                      if (data.error) {
                        return <p>{data.error.message}</p>;
                      }
                      return (
                        <div style={styles.centerItemsQuery}>
                          <Label size="big" basic color="teal">
                            Amount of new users = {data.data.users.totalCount}
                          </Label>
                        </div>
                      );
                    }}
                  </Query>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
