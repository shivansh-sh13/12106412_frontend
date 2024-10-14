import React from 'react';
import Chart from 'react-apexcharts';

interface Booking {
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
}

interface TimeSeriesChartProps {
  data: Booking[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const series = [
    {
      name: 'Total Visitors',
      data: data.map((booking) => ({
        x: new Date(
          `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
        ).getTime(),
        y: booking.adults + booking.children + booking.babies,
      })),
    },
  ];

  const options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Number of Visitors',
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
  };

  return (
    <div>
      <h3>Number of Visitors Per Day</h3>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
