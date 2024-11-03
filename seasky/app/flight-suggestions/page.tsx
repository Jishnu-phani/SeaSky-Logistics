"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './flight.module.css'; // Import CSS module for styles

type Suggestion = {
  id: number;
  price: string;
};

const FlightSuggestions = () => {
  const searchParams = useSearchParams();
  const fromCity = searchParams.get('fromCity');
  const toCity = searchParams.get('toCity');
  const passengers = searchParams.get('passengers');
  const travelDate = searchParams.get('travelDate');
  const [passportNumber, setPassportNumber] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const generateRandomPrice = (): string => {
    return (Math.random() * 500 + 100).toFixed(2); // Generate random price between 100 and 600
  };

  const flights = ["Indigo", "AirIndia",  "SpiceJet", "Vistara", "GoAir", "AirAsia", "AirIndiaExpress"];
  const randomFlight = flights[Math.floor(Math.random() * flights.length)];

  useEffect(() => {
    const initialSuggestions: Suggestion[] = [
      { id: 1, price: generateRandomPrice() },
      { id: 2, price: generateRandomPrice() },
      { id: 3, price: generateRandomPrice() },
    ];
    setSuggestions(initialSuggestions);
  }, []);

  const handleSelect = (id: number) => {
    if (!passportNumber) {
      alert('Please enter your passport number.');
      return;
    }
    // Handle ticket selection logic here
    console.log(`Selected flight ${id} with passport number ${passportNumber}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Flight Suggestions</h1>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className={styles.card}>
            <h2>{flights[Math.floor(Math.random() * flights.length)]}</h2>
            <p>From: {fromCity}</p>
            <p>To: {toCity}</p>
            <p>Date: {travelDate}</p>
            <p>Passengers: {passengers}</p>
            <p>Price per ticket: ${suggestion.price}</p>
            <button
              className={styles.button}
              onClick={() => handleSelect(suggestion.id)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="passportNumber">Passport Number:</label>
        <input
          type="text"
          id="passportNumber"
          value={passportNumber}
          onChange={(e) => setPassportNumber(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default FlightSuggestions;