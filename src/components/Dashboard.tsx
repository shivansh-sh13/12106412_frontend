import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeSeriesChart from './TimeSeriesChart';
import ColumnChart from './ColumnChart';
import bookingData from '../data/bookingsData.json'; // Adjust the path to match your project

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState(bookingData);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = bookingData.filter((booking) => {
        const bookingDate = new Date(
          `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
        );
        return bookingDate >= startDate && bookingDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(bookingData);
    }
  }, [startDate, endDate]);

  return (
    <div>
      <h1>Hotel Booking Dashboard</h1>
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
        />
      </div>
      <div className="charts">
        <TimeSeriesChart data={filteredData} />
        <ColumnChart data={filteredData} />
      </div>
    </div>
  );
};

export default Dashboard;
