import * as React from "react";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";
import { Header, Label } from "semantic-ui-react";
import { XAxis, Tooltip, CartesianGrid, YAxis, BarChart, Bar } from "recharts";
const data = [
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
    "Account registrations": 9,
    Total: 87
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
            <Label size="big" basic color="teal">
              Total amount of users = 87
            </Label>
            <Label size="big" basic color="teal">
              Amount of new users = 9
            </Label>
          </div>
        </div>
        <div style={styles.centerItems}>
          <div>
            <Header as="h2" textAlign="center">
              <Header.Content>Account registrations</Header.Content>
              <Header.Subheader>
                The total amount of registrations for each month
              </Header.Subheader>
            </Header>
            <BarChart width={1000} height={300} data={data}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Bar stackId="a" fill="#8884d8" dataKey="Total" />
              <Bar stackId="a" fill="#82ca9d" dataKey="Account registrations" />
            </BarChart>
          </div>
        </div>
      </div>
    );
  }
}

export default UserStats;
