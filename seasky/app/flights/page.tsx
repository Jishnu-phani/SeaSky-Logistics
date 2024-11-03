// app/flights/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './flight.module.css'; // Import CSS module for styles

const BookingPage = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Navigate to the new page with query parameters
    router.push(`/flight-suggestions?fromCity=${fromCity}&toCity=${toCity}&passengers=${passengers}&travelDate=${travelDate}`);
  };

  return (
    <div className={styles.container}>
      <h1>Book Your Flight</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fromCity">From:</label>
          <input
            type="text"
            id="fromCity"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="toCity">To:</label>
          <input
            type="text"
            id="toCity"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="travelDate">Travel Date:</label>
          <input
            type="date"
            id="travelDate"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Search Flights
        </button>
      </form>
    </div>
  );
};

export default BookingPage;