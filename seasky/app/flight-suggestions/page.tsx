// app/flights/flight-suggestions/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import styles from './flight.module.css'; // Import CSS module for styles

const FlightSuggestions = () => {
  const searchParams = useSearchParams();
  const fromCity = searchParams.get('fromCity');
  const toCity = searchParams.get('toCity');
  const passengers = searchParams.get('passengers');
  const travelDate = searchParams.get('travelDate');

  const generateRandomPrice = () => {
    return (Math.random() * 500 + 100).toFixed(2); // Generate random price between 100 and 600
  };

  const suggestions = [
    { id: 1, price: generateRandomPrice() },
    { id: 2, price: generateRandomPrice() },
    { id: 3, price: generateRandomPrice() },
  ];

  return (
    <div className={styles.container}>
      <h1>Flight Suggestions</h1>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className={styles.card}>
            <h2>Flight {suggestion.id}</h2>
            <p>From: {fromCity}</p>
            <p>To: {toCity}</p>
            <p>Date: {travelDate}</p>
            <p>Passengers: {passengers}</p>
            <p>Price per ticket: ${suggestion.price}</p>
            <button className={styles.button}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSuggestions;