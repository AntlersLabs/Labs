export interface DataPoint {
  [key: string]: string | number;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'scatter' | 'area';
  xAxis: string;
  yAxis: string;
  title: string;
}