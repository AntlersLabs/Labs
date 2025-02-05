import React from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { DataPoint } from '../types';

interface FileUploadProps {
  onDataLoaded: (data: DataPoint[]) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const processData = (data: DataPoint[]) => {
    // Convert string numbers to actual numbers
    return data.map(row => {
      const processedRow: DataPoint = {};
      Object.entries(row).forEach(([key, value]) => {
        // Convert string numbers to actual numbers
        if (typeof value === 'string' && !isNaN(Number(value))) {
          processedRow[key] = Number(value);
        } else {
          processedRow[key] = value;
        }
      });
      return processedRow;
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          const data = Array.isArray(json) ? json : [json];
          onDataLoaded(processData(data));
        } catch (error) {
          alert('Error parsing JSON file');
          console.error('JSON parsing error:', error);
        }
      };
      reader.readAsText(file);
    } else if (file.type === 'text/csv') {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as DataPoint[];
          onDataLoaded(processData(data));
        },
        header: true,
        dynamicTyping: true,
      });
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
               file.type === 'application/vnd.ms-excel') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            raw: false, // Get formatted text
            defval: '', // Default value for empty cells
          }) as DataPoint[];
          
          // Process the data to ensure proper number conversion
          const processedData = processData(jsonData);
          console.log('Processed Excel data:', processedData);
          onDataLoaded(processedData);
        } catch (error) {
          alert('Error parsing Excel file');
          console.error('Excel parsing error:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a CSV, JSON, or Excel file');
    }
  };

  return (
    <div className="w-full">
      <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
        <Upload className="w-12 h-12 text-gray-400" />
        <span className="mt-2 text-base text-gray-600">Upload your dataset (CSV, JSON, or Excel)</span>
        <input
          type="file"
          className="hidden"
          accept=".csv,.json,.xlsx,.xls"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}