"use client";

import { useState } from 'react';
import styles from './parcel.module.css'; // Import CSS module for styles

const ParcelPage = () => {
  const [senderAddress, setSenderAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: ''
  });
  const [receiverAddress, setReceiverAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: ''
  });
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [isFragile, setIsFragile] = useState(false);
  const [description, setDescription] = useState('');
  const [shippingDate, setShippingDate] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API calls)
    console.log({ senderAddress, receiverAddress, weight, volume, isFragile, description, shippingDate });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'sender' | 'receiver') => {
    const { name, value } = e.target;
    if (type === 'sender') {
      setSenderAddress(prev => ({ ...prev, [name]: value }));
    } else {
      setReceiverAddress(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Ship Your Parcel</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.column}>
          <h2>Sender Address</h2>
          <div className={styles.formGroup}>
            <label htmlFor="senderStreet">Street:</label>
            <input
              type="text"
              id="senderStreet"
              name="street"
              value={senderAddress.street}
              onChange={(e) => handleAddressChange(e, 'sender')}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="senderCity">City:</label>
            <input
              type="text"
              id="senderCity"
              name="city"
              value={senderAddress.city}
              onChange={(e) => handleAddressChange(e, 'sender')}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="senderState">State:</label>
            <input
              type="text"
              id="senderState"
              name="state"
              value={senderAddress.state}
              onChange={(e) => handleAddressChange(e, 'sender')}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="senderCountry">Country:</label>
            <input
              type="text"
              id="senderCountry"
              name="country"
              value={senderAddress.country}
              onChange={(e) => handleAddressChange(e, 'sender')}
              required
            />
          </div>
        </div>

        <div className={styles.column}>
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
        </div>
        
        <div className={styles.column}>
          <h2>Receiver Address</h2>
          <div className={styles.formGroup}>
            <label htmlFor="receiverStreet">Street:</label>
            <input
              type="text"
              id="receiverStreet"
              name="street"
              value={receiverAddress.street}
              onChange={(e) => handleAddressChange(e, 'receiver')}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="receiverCity">City:</label>
            <input
              type="text"
              id="receiverCity"
              name="city"
              value={receiverAddress.city}
              onChange={(e) => handleAddressChange(e, 'receiver')}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="receiverState">State:</label>
            <input
              type="text"
              id="receiverState"
              name="state"
              value={receiverAddress.state}
              onChange={(e) => handleAddressChange(e, 'receiver')}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="receiverCountry">Country:</label>
            <input
              type="text"
              id="receiverCountry"
              name="country"
              value={receiverAddress.country}
              onChange={(e) => handleAddressChange(e, 'receiver')}
              required
            />
          </div>
        </div>

      </form>
    </div>
  );
};

export default ParcelPage;