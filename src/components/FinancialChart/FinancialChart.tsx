import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CircularProgress, Alert } from '@mui/material';
import { fetchIncomeStatement, fetchBalanceSheet } from '../../services/financeApi';
import './styles.css';

// Register the necessary components for a line chart with timeseries data
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
  Legend
);

type FinancialDataProps = {
    symbol: string;
};

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Quarterly Financial Data',
      font: {
          size: 18
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0,0,0,0.8)',
      bodyColor: '#fff',
      titleColor: '#fff',
      cornerRadius: 6,
      bodySpacing: 5,
      mode: 'index',
      intersect: false,
      position: 'nearest',
    }
  },
  scales: {
    x: {
      type: 'timeseries',
      time: {
        parser: 'yyyy-MM-dd',
        tooltipFormat: 'PPP', 
        unit: 'day'
      },
      title: {
        display: true,
        text: 'Date'
      },
      grid: {
        display: false
      }
    },
    y: {
      type: 'linear',
      title: {
        display: true,
        text: 'USD (in thousands)'
      },
      grid: {
        color: (context) => {
          return context.tick.value <= 0 ? '#ff0000' : '#e0e0e0';
        },
        lineWidth: (context) => {
          return context.tick.value === 0 ? 2 : 1; // Emphasize zero-line if necessary
        }
      },
      ticks: {
        callback: function(value, index, values) {
            if (typeof value === 'string') {
              value = parseInt(value, 10);
            }

            if (Math.abs(value) >= 1000000) {
                return `${value / 1000000}M`;
            } else if (Math.abs(value) >= 1000) {
                return `${value / 1000}k`;
            }
            return value;
        },
      }
    }
  },
  elements: {
      line: {
          tension: 0.3
      },
      point: {
          radius: 4,
          hoverRadius: 6,
          hoverBorderWidth: 2
      }
  },
  animation: {
      duration: 800
  }
};

export const FinancialChart: React.FC<FinancialDataProps> = ({ symbol }) => {
    const [chartData, setChartData] = useState<ChartData<'line', { x: string; y: number }[], string>>({
      labels: [],
      datasets: []
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const prepareChartData = async (symbol: string) => {
      setLoading(true);
      setError(null);
      try {
        const incomeData = await fetchIncomeStatement(symbol);
        const balanceData = await fetchBalanceSheet(symbol);
        const netIncome = incomeData.quarterlyReports.map((report: any) => ({
          x: report.fiscalDateEnding,
          y: parseFloat(report.netIncome)
        }));
        const totalRevenue = incomeData.quarterlyReports.map((report: any) => ({
          x: report.fiscalDateEnding,
          y: parseFloat(report.totalRevenue)
        }));
        const shareholderEquity = balanceData.quarterlyReports.map((report: any) => ({
          x: report.fiscalDateEnding,
          y: parseFloat(report.totalShareholderEquity)
        }));

        const labels = incomeData.quarterlyReports.map((report: any) => report.fiscalDateEnding);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Net Income',
              data: netIncome,
              borderColor: '#4D96FF',
              backgroundColor: 'rgba(77, 150, 255, 0.5)',
              fill: false,
            },
            {
              label: 'Total Revenue',
              data: totalRevenue,
              borderColor: '#49BE25',
              backgroundColor: 'rgba(73, 190, 37, 0.5)',
              fill: false,
            },
            {
              label: 'Shareholder Equity',
              data: shareholderEquity,
              borderColor: '#FF4563',
              backgroundColor: 'rgba(255, 69, 99, 0.5)',
              fill: false,
            }
          ],
        });
      } catch (error) {
        console.error('Failed to fetch financial data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      prepareChartData(symbol);
    }, [symbol]);

    return (
      <div className='chart-container'>
        {error && (
          <Alert severity="error" className='chart-error'>
            {error}
          </Alert>
        )}
        {loading && (
          <div className='loading-container'>
            <CircularProgress />
          </div>
        )}
        {!loading && !error && <Line data={chartData} options={options} />}
      </div>
    );
};
