import React, { useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { DataPoint, ChartConfig } from '../types';

interface ChartComponentProps {
  data: DataPoint[];
  config: ChartConfig;
}

export function ChartComponent({ data, config }: ChartComponentProps) {
  useEffect(() => {
    console.log('Chart data:', data);
    console.log('Chart config:', config);
  }, [data, config]);

  const renderChart = () => {
    if (!data || data.length === 0) {
      return null;
    }

    const commonProps = {
      data,
      width: 500,
      height: 300,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (config.type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxis} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={config.yAxis} stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxis} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={config.yAxis} fill="#8884d8" />
          </BarChart>
        );
      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxis} type="number" />
            <YAxis dataKey={config.yAxis} type="number" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data} fill="#8884d8" />
          </ScatterChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={config.xAxis} />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={config.yAxis} stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">{config.title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}