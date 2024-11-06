"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './parcel.module.css'; // Import CSS module for styles

const ParcelPage = () => {
  const [senderAddress, setSenderAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: ''
  });
  const [receiverAddress, setReceiverAddress] = useState({
    fName: '',
    lName: '',
    street: '',
    city: '',
    state: '',
    country: '',
  });
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [isFragile, setIsFragile] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/parcel-suggestions?senderStreet=${senderAddress.street}&senderCity=${senderAddress.city}&senderState=${senderAddress.state}&senderCountry=${senderAddress.country}&receiverfName=${receiverAddress.fName}&receiverlName=${receiverAddress.lName}&receiverStreet=${receiverAddress.street}&receiverCity=${receiverAddress.city}&receiverState=${receiverAddress.state}&receiverCountry=${receiverAddress.country}&weight=${weight}&volume=${volume}&isFragile=${isFragile}&shippingDate=${shippingDate}&description=${description}&category=${category}`);
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
            <label htmlFor="description">Category:</label>
            <select
              value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.statusSelect}
                >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing & Apparel">Clothing & Appare</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Chemicals & Hazardous Materials">Chemicals & Hazardous Materials</option>
                    <option value="Automotive Parts">Automotive Parts</option>
                    <option value="Medical Supplies & Equipment">Medical Supplies & Equipment</option>
                    <option value="Textiles & Fabrics">Textiles & Fabrics</option>
                    <option value="Toys & Games">Toys & Games</option>
                    <option value="Books & Stationery">Books & Stationery</option>
                    <option value="Precious Metals & Gems">Precious Metals & Gems</option>
                    <option value="Live Animals">Live Animals</option>
                    <option value="Plants & Agricultural Products">Plants & Agricultural Products</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Machinery & Industrial Equipment">Machinery & Industrial Equipment</option>
                    <option value="Artwork & Antiques">Artwork & Antiques</option>
                    <option value="Sports Equipment">Sports Equipment</option>
                    <option value="Construction Materials">Construction Materials</option>
                    <option value="Cosmetics & Personal Care Products">Cosmetics & Personal Care Products</option>
            </select>
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
          <h2>Receiver Details</h2>
          <div className={styles.formGroup}>
            <label htmlFor="receiverStreet">First Name:</label>
            <input
              type="text"
              id="fName"
              name="fName"
              value={receiverAddress.fName}
              onChange={(e) => handleAddressChange(e, 'receiver')}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="receiverStreet">Last Name:</label>
            <input
              type="text"
              id="lName"
              name="lName"
              value={receiverAddress.lName}
              onChange={(e) => handleAddressChange(e, 'receiver')}
              required
            />
          </div>
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