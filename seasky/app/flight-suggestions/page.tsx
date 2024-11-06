"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from './flight.module.css';

type Suggestion = {
  id: number;
  price: string;
  airline: string;
};

const FlightSuggestions = () => {
  const searchParams = useSearchParams();
  const fromCity = searchParams.get('fromCity');
  const toCity = searchParams.get('toCity');
  const passengers = searchParams.get('passengers');
  const travelDate = searchParams.get('travelDate');
  const [passportNumber, setPassportNumber] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  const generateRandomPrice = (): string => {
    return (Math.random() * 500 + 100).toFixed(2);
  };

  const getRandomFlight = (): string => {
    const flights = ["Indigo", "AirIndia", "SpiceJet", "Vistara", "GoAir", "AirAsia", "AirIndiaExpress"];
    return flights[Math.floor(Math.random() * flights.length)];
  };

  useEffect(() => {
    const initialSuggestions: Suggestion[] = [
      { id: 1, price: generateRandomPrice(), airline: getRandomFlight() },
      { id: 2, price: generateRandomPrice(), airline: getRandomFlight() },
      { id: 3, price: generateRandomPrice(), airline: getRandomFlight() },
    ];
    setSuggestions(initialSuggestions);
  }, []);

  const handleSelect = async (id: number) => {
    if (!passportNumber) {
      alert('Please enter your passport number.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/bookFlight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          passportNumber,
          userId: null, // Update with logged-in user ID if available
          fromCity,
          toCity,
          travelDate,
        }),
      });

      if (response.ok) {
        alert('Booked successfully');
        router.push('/home');
      } else {
        const data = await response.json();
        alert(data.message || 'Booking failed');
      }
    } catch (error) {
      console.error("Error booking flight:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Flight Suggestions</h1>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className={styles.card}>
            <h2>{suggestion.airline}</h2>
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