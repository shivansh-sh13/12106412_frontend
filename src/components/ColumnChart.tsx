import React from 'react';
import Chart from 'react-apexcharts';

interface Booking {
  country: string;
  adults: number;
  children: number;
  babies: number;
}

interface ColumnChartProps {
  data: Booking[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const visitorsPerCountry = data.reduce((acc: { [key: string]: number }, booking) => {
    const totalVisitors = booking.adults + booking.children + booking.babies;
    if (acc[booking.country]) {
      acc[booking.country] += totalVisitors;
    } else {
      acc[booking.country] = totalVisitors;
    }
    return acc;
  }, {});

  const series = [
    {
      name: 'Visitors',
      data: Object.values(visitorsPerCountry),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toString();
      },
    },
    xaxis: {
      categories: Object.keys(visitorsPerCountry),
      title: {
        text: 'Countries',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Visitors',
      },
    },
  };

  return (
    <div>
      <h3>Number of Visitors per Country</h3>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;
