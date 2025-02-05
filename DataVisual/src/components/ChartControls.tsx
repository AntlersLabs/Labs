import React from 'react';
import { ChartConfig } from '../types';

interface ChartControlsProps {
  columns: string[];
  config: ChartConfig;
  onConfigChange: (config: ChartConfig) => void;
}

export function ChartControls({ columns, config, onConfigChange }: ChartControlsProps) {
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Chart Type</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={config.type}
          onChange={(e) => onConfigChange({ ...config, type: e.target.value as ChartConfig['type'] })}
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="scatter">Scatter Plot</option>
          <option value="area">Area Chart</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">X Axis</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={config.xAxis}
          onChange={(e) => onConfigChange({ ...config, xAxis: e.target.value })}
        >
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Y Axis</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={config.yAxis}
          onChange={(e) => onConfigChange({ ...config, yAxis: e.target.value })}
        >
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Chart Title</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </div>
    </div>
  );
}