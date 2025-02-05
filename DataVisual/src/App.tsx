import React, { useState, useRef } from 'react';
import { Download, Save } from 'lucide-react';
import { toPng } from 'html-to-image';
import { FileUpload } from './components/FileUpload';
import { ChartComponent } from './components/ChartComponent';
import { ChartControls } from './components/ChartControls';
import { DataPoint, ChartConfig } from './types';

function App() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [config, setConfig] = useState<ChartConfig>({
    type: 'line',
    xAxis: '',
    yAxis: '',
    title: 'Data Visualization'
  });
  const chartRef = useRef<HTMLDivElement>(null);
  const [savedCharts, setSavedCharts] = useState<ChartConfig[]>([]);

  const handleDataLoaded = (newData: DataPoint[]) => {
    setData(newData);
    if (newData.length > 0) {
      const columns = Object.keys(newData[0]);
      setConfig(prev => ({
        ...prev,
        xAxis: columns[0],
        yAxis: columns[1]
      }));
    }
  };

  const exportChart = async () => {
    if (chartRef.current) {
      const dataUrl = await toPng(chartRef.current);
      const link = document.createElement('a');
      link.download = 'chart-export.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const saveChart = () => {
    setSavedCharts(prev => [...prev, config]);
  };

  const loadSavedChart = (savedConfig: ChartConfig) => {
    setConfig(savedConfig);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Data Visualization Tool
        </h1>

        {data.length === 0 ? (
          <FileUpload onDataLoaded={handleDataLoaded} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div ref={chartRef}>
                <ChartComponent data={data} config={config} />
              </div>
              <div className="mt-4 flex gap-4 justify-end">
                <button
                  onClick={exportChart}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export as PNG
                </button>
                <button
                  onClick={saveChart}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Chart
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <ChartControls
                columns={Object.keys(data[0])}
                config={config}
                onConfigChange={setConfig}
              />

              {savedCharts.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="font-bold mb-4">Saved Charts</h3>
                  <div className="space-y-2">
                    {savedCharts.map((savedConfig, index) => (
                      <button
                        key={index}
                        onClick={() => loadSavedChart(savedConfig)}
                        className="block w-full text-left p-2 hover:bg-gray-100 rounded"
                      >
                        {savedConfig.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;