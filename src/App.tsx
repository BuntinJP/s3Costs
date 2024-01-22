import React, { useState } from 'react';
import { Chart } from 'react-chartjs-2';

const calculateAWSS3StandardPrice = (sizeGB: number): number => {
  if (sizeGB <= 50000) {
    // 50TB
    return sizeGB * 0.023;
  } else if (sizeGB <= 500000) {
    // 450TB
    return 50000 * 0.023 + (sizeGB - 50000) * 0.022;
  } else {
    return 50000 * 0.023 + 450000 * 0.022 + (sizeGB - 500000) * 0.021;
  }
};

const calculateAzureHotPrice = (sizeGB: number): number => {
  if (sizeGB <= 51200) {
    // 50TB
    return sizeGB * 0.018;
  } else {
    return 51200 * 0.018 + (sizeGB - 51200) * 0.0166;
  }
};

const App: React.FC = () => {
  const [unit, setUnit] = useState<'GB' | 'TB'>('GB');

  const getChartData = () => {
    const labels = [];
    const awsData = [];
    const azureData = [];
    const max = unit === 'GB' ? 1000 : 10;
    const multiplier = unit === 'GB' ? 1 : 1024;

    for (let i = 1; i <= max; i++) {
      labels.push(`${i} ${unit}`);
      awsData.push(calculateAWSS3StandardPrice(i * multiplier));
      azureData.push(calculateAzureHotPrice(i * multiplier));
    }

    return {
      labels,
      datasets: [
        {
          label: 'AWS S3 Standard',
          backgroundColor: 'yellow',
          borderColor: 'yellow',
          data: awsData,
        },
        {
          label: 'Azure Hot',
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: azureData,
        },
      ],
    };
  };

  return (
    <div>
      <h1>Cloud Storage Price Comparison</h1>
      <button onClick={() => setUnit(unit === 'GB' ? 'TB' : 'GB')}>
        Switch to {unit === 'GB' ? 'TB' : 'GB'}
      </button>
      <Chart type="line" data={getChartData()} />
    </div>
  );
};

export default App;
