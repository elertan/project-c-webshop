import * as React from "react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import { Button, Icon, Header } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import {
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const styles = {
  centerItems: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center"
  }
};

class Statistics extends React.Component {
  public render() {
    const data = [
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
        Profit: 4800,
        Albums: 2100,
        Singles: 1200
      },
      {
        Month: "June",
        "Account registrations": 9,
        Profit: 3800,
        Albums: 2500,
        Singles: 7900
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
                  The total amount of registrations for each month
                </Header.Subheader>
              </Header>
              <AreaChart
                width={400}
                height={150}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
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
              </Header>
              <AreaChart
                width={450}
                height={150}
                data={data}
                margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
              >
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
              </Header>
              <AreaChart
                width={400}
                height={150}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
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

        <div style={styles.centerItems}>
          <Header as="h2" textAlign="center">
            <Header.Content>More statistics</Header.Content>
            <Header.Subheader>
              Choose a category to see more statistics
            </Header.Subheader>
          </Header>
        </div>
        <div style={styles.centerItems}>
          <Button.Group basic size="massive">
            <NavLink to={"/admin/statistics/user"}>
              <Button animated="fade" size="massive">
                <Button.Content visible>
                  <Icon name="users" />
                  Users
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="users" />
                  Users
                </Button.Content>
              </Button>
            </NavLink>

            <NavLink to={"/admin/statistics/music"}>
              <Button animated="fade" size="massive">
                <Button.Content visible>
                  <Icon name="music" />
                  Music
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="music" />
                  Music
                </Button.Content>
              </Button>
            </NavLink>

            <NavLink to={"/admin/statistics/finance"}>
              <Button animated="fade" size="massive">
                <Button.Content visible>
                  <Icon name="euro sign" />
                  Finance
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="euro sign" />
                  Finance
                </Button.Content>
              </Button>
            </NavLink>
          </Button.Group>
        </div>

      </div>
    );
  }
}

export default Statistics;
