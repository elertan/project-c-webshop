import * as React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area
} from "recharts";
import AdminMenu from "../../../../reusable/Admin/AdminMenu";

class Statistics extends React.Component {
  public render() {
    const data = [
      { name: "January", uv: 4000, pv: 2400 },
      { name: "February", uv: 3000, pv: 1398 },
      { name: "March", uv: 2000, pv: 1800 },
      { name: "April", uv: 5000, pv: 3800 },
      { name: "May", uv: 1000, pv: 4800 },
      { name: "June", uv: 6000, pv: 2800 }
    ];

    return (
      <div>
        <AdminMenu />
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    );
  }
}

export default Statistics;
