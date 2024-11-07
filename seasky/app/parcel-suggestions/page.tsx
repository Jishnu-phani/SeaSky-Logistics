"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from './parcel.module.css';
import Image from 'next/image';

type ShippingOption = {
  id: number;
  carrier: string;
  price: string;
  estimatedDays: number;
  serviceType: string;
};

const getDeliveryDays = (serviceType: string): number => {
  const deliveryDays: { [key: string]: number } = {
    "Express": 1,
    "Next Day": 1,
    "2-Day": 2,
    "Priority": 3,
    "Standard": 5,
    "Economy": 7
  };
  return deliveryDays[serviceType] || 5; // Default to standard shipping days
};

const getCategoryMultiplier = (category: string): number => {
  const multipliers: { [key: string]: number } = {
    "Electronics": 2.5,
    "Clothing & Apparel": 1.2,
    "Food & Beverages": 1.8,
    "Chemicals & Hazardous Materials": 3.0,
    "Automotive Parts": 2.2,
    "Medical Supplies & Equipment": 2.8,
    "Textiles & Fabrics": 1.3,
    "Toys & Games": 1.4,
    "Books & Stationery": 1.6,
    "Precious Metals & Gems": 4.0,
    "Live Animals": 3.5,
    "Plants & Agricultural Products": 1.7,
    "Pharmaceuticals": 2.7,
    "Machinery & Industrial Equipment": 2.4,
    "Artwork & Antiques": 3.2,
    "Sports Equipment": 1.5,
    "Construction Materials": 2.0,
    "Cosmetics & Personal Care Products": 1.6
  };
  return multipliers[category] || 1.0;
};

const getServiceTypeMultiplier = (serviceType: string): number => {
  const multipliers: { [key: string]: number } = {
    "Express": 2.0,
    "Standard": 1.0,
    "Economy": 0.8,
    "Priority": 1.8,
    "Next Day": 2.5,
    "2-Day": 1.5
  };
  return multipliers[serviceType] || 1.0;
};

const calculatePrice = (
  serviceType: string,
  category: string | null,
  isFragile: string | null,
  weight: string | null,
  volume: string | null
): string => {
  let basePrice = 50;

  if (category) {
    basePrice *= getCategoryMultiplier(category);
  }
  basePrice *= getServiceTypeMultiplier(serviceType);
  if (isFragile === 'yes') {
    basePrice *= 1.4;
  }
  const weightNum = parseFloat(weight || "0");
  const volumeNum = parseFloat(volume || "0");
  basePrice += (weightNum * 10) + (volumeNum * 100);

  return basePrice.toFixed(2);
};

const ParcelSuggestions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const senderCity = searchParams.get('senderCity');
  const senderCountry = searchParams.get('senderCountry');
  const receiverCity = searchParams.get('receiverCity');
  const receiverCountry = searchParams.get('receiverCountry');
  const weight = searchParams.get('weight');
  const volume = searchParams.get('volume');
  const isFragile = searchParams.get('isFragile');
  const category = searchParams.get('category');
  
  const [suggestions, setSuggestions] = useState<ShippingOption[]>([]);

  const carriers = [
    "FedEx", "DHL", "UPS", "USPS", "BlueDart", "Royal Mail", "Canada Post"
  ];

  const serviceTypes = [
    "Express", "Standard", "Economy", "Priority", "Next Day", "2-Day"
  ];

  useEffect(() => {
    const initialSuggestions: ShippingOption[] = serviceTypes.slice(0, 3).map((serviceType, index) => ({
      id: index + 1,
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      serviceType,
      price: calculatePrice(serviceType, category, isFragile, weight, volume),
      estimatedDays: getDeliveryDays(serviceType),
    }));
    setSuggestions(initialSuggestions);
  }, [category, isFragile, weight, volume]);

  const handleShowBreakdown = (option: ShippingOption) => {
    setSelectedOption(option);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Shipping Options</h1>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className={styles.card}>
            <h2>{suggestion.carrier}</h2>
            <p>Service Type: {suggestion.serviceType}</p>
            <p>Estimated Delivery: {suggestion.estimatedDays} days</p>
            <p>From: {senderCity}, {senderCountry}</p>
            <p>To: {receiverCity}, {receiverCountry}</p>
            <p className={styles.price}>Price: ${suggestion.price}</p>
            <button onClick={() => handleShowBreakdown(suggestion)}className={styles.breakdown}>Price Breakdown</button>
          </div>
        ))}
      </div>
      
      {showModal && selectedOption && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Price Breakdown for {selectedOption.carrier} - {selectedOption.serviceType}</h3>
            <ul>
              <li>Base Price: $50</li>
              <li>Category Multiplier: x{getCategoryMultiplier(category || '')}</li>
              <li>Service Type Multiplier: x{getServiceTypeMultiplier(selectedOption.serviceType)}</li>
              <li>Fragile Handling: {isFragile === 'yes' ? 'x1.4' : 'No extra charge'}</li>
              <li>Weight Charge: ${parseFloat(weight || "0") * 10}</li>
              <li>Volume Charge: ${parseFloat(volume || "0") * 100}</li>
              <li><strong>Total Price: ${selectedOption.price}</strong></li>
            </ul>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelSuggestions;
