import { Chart } from "react-google-charts";

export const data = [
  [
    "Distracted Driving",
    "Harsh Acceleration",
    "Harsh Braking",
    "Harsh Cornering",
    "Speed Limit Violation",
    "Stop Sign Violation",
    "Tailgating",
  ],
  ["2004/05", 165, 938, 522, 998, 450, 614.6],
  ["2005/06", 135, 1120, 599, 1268, 288, 682],
  ["2006/07", 157, 1167, 587, 807, 397, 623],
  ["2007/08", 139, 1110, 615, 968, 215, 609.4],
  ["2008/09", 136, 691, 629, 1026, 366, 569.6],
];

export const options = {
  title: "Incident Trend",
  vAxis: { title: "No. of Incidents / 100 Kilometers" },
  hAxis: { title: "Time" },
  seriesType: "bars",
  series: { 8: { type: "line" } },
  legend: { position: "bottom" }
};

function Charts() {
  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
export default Charts
