import * as React from "react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import { Header, Label } from "semantic-ui-react";
import {
  AreaChart,
  XAxis,
  Area,
  Tooltip,
  CartesianGrid,
  YAxis
} from "recharts";
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
    Profit: 5000,
    Albums: 2100,
    Singles: 7900
  },
  {
    Month: "June",
    "Account registrations": 9,
    Profit: 4000,
    Albums: 2500,
    Singles: 1200
  }
];
const styles = {
  centerItems: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center"
  }
};
class UserStats extends React.Component {
  public render() {
    return (
      <div>
        <AdminMenu />
        <div style={styles.centerItems}>
          <div>
            <Header as="h2" textAlign="center">
              <Header.Content>Account registrations</Header.Content>
              <Header.Subheader>
                The total amount of registrations for each month
              </Header.Subheader>
              <Label color="red">
                You had 17 less registrations than last month
              </Label>
            </Header>
            <AreaChart
              width={800}
              height={200}
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
      </div>
    );
  }
}

export default UserStats;
