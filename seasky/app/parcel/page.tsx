"use client";

import { useState } from 'react';
import styles from './parcel.module.css'; // Import CSS module for styles

const ParcelPage = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [isFragile, setIsFragile] = useState(false);
  const [description, setDescription] = useState('');
  const [shippingDate, setShippingDate] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API calls)
    console.log({ fromCity, toCity, weight, volume, isFragile, description, shippingDate });
  };

  return (
    <div className={styles.container}>
      <h1>Ship Your Parcel</h1>
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
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            step="0.01"
            min="0.01"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="volume">Volume (m³):</label>
          <input
            type="number"
            id="volume"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            step="0.01"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="isFragile">Fragile:</label>
          <select
            id="isFragile"
            value={isFragile ? "yes" : "no"}
            onChange={(e) => setIsFragile(e.target.value === "yes")}
            required
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="shippingDate">Shipping Date:</label>
          <input
            type="date"
            id="shippingDate"
            value={shippingDate}
            onChange={(e) => setShippingDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Shipping options
        </button>
      </form>
    </div>
  );
};

export default ParcelPage;