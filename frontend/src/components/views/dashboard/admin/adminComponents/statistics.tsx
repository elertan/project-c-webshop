import * as React from "react";
import { Chart } from "react-google-charts";
import AdminMenu from "../../../reusable/Admin/AdminMenu";

class Statistics extends React.Component {
  public render() {
    return (
      <div>
        <AdminMenu />
        <Chart
          width={"50vw"}
          height={"50vh"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Name", "Amount"],
            ["Dennis", 102],
            ["Tim", 46],
            ["Robrecht", 32],
            ["Joris", 54],
            ["Sidney", 5]
          ]}
          rootProps={{ "data-testid": "6" }}
          chartPackages={["corechart", "controls"]}
          render={({ renderControl, renderChart }) => {
            return (
              <div style={{ display: "flex" }}>
                <div style={{ width: "20vw" }}>{renderControl(() => true)}</div>
                <div style={{ width: "30vw" }}>{renderChart()}</div>
              </div>
            );
          }}
          controls={[
            {
              controlType: "StringFilter",
              options: {
                filterColumnIndex: 0,
                matchType: "any", // 'prefix' | 'exact',
                ui: {
                  label: "Search by name"
                }
              }
            },
            {
              controlType: "NumberRangeFilter",
              controlID: "age-filter",
              options: {
                filterColumnIndex: 1,
                ui: {
                  labelStacking: "vertical",
                  label: "Amount bought Selection:",
                  allowTyping: false,
                  allowMultiple: false
                }
              }
            }
          ]}
        />
      </div>
    );
  }
}

export default Statistics;
