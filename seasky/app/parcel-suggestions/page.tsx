"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from './parcel.module.css';

type ShippingOption = {
  id: number;
  carrier: string;
  price: string;
  estimatedDays: number;
  serviceType: string;
};

const ParcelSuggestions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const senderStreet = searchParams.get('senderStreet');
  const senderCity = searchParams.get('senderCity');
  const senderState = searchParams.get('senderState');
  const senderCountry = searchParams.get('senderCountry');
  const receiverfName = searchParams.get('receiverfName');
  const receiverlName = searchParams.get('receiverlName');
  const receiverStreet = searchParams.get('receiverStreet');
  const receiverCity = searchParams.get('receiverCity');
  const receiverState = searchParams.get('receiverState');
  const receiverCountry = searchParams.get('receiverCountry');
  const weight = searchParams.get('weight');
  const volume = searchParams.get('volume');
  const isFragile = searchParams.get('isFragile');
  const description = searchParams.get('description');
  const category = searchParams.get('category');
  const shippingDate = searchParams.get('shippingDate');
  
  const [suggestions, setSuggestions] = useState<ShippingOption[]>([]);

  const generateRandomPrice = (): string => {
    return (Math.random() * 200 + 50).toFixed(2);
  };

  const carriers = [
    "FedEx",
    "DHL",
    "UPS",
    "USPS",
    "BlueDart",
    "Royal Mail",
    "Canada Post"
  ];

  const serviceTypes = [
    "Express",
    "Standard",
    "Economy",
    "Priority",
    "Next Day",
    "2-Day"
  ];

  const getRandomCarrier = () => carriers[Math.floor(Math.random() * carriers.length)];
  const getRandomServiceType = () => serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
  const getRandomDeliveryDays = () => Math.floor(Math.random() * 7) + 1;

  useEffect (() => {

    const fetchMinPrice = async () => {
      try {
        const response = await fetch('/api/minimum', {method: 'GET'});
        const data = await response.json();
        console.log(data);

      } catch (error) {
        console.error("Error fetching minimum price:", error);
      }
    }
    
    fetchMinPrice();
    const initialSuggestions: ShippingOption[] = [
      {
        id: 1,
        carrier: getRandomCarrier(),
        price: generateRandomPrice(),
        estimatedDays: getRandomDeliveryDays(),
        serviceType: getRandomServiceType()
      },
      {
        id: 2,
        carrier: getRandomCarrier(),
        price: generateRandomPrice(),
        estimatedDays: getRandomDeliveryDays(),
        serviceType: getRandomServiceType()
      },
      {
        id: 3,
        carrier: getRandomCarrier(),
        price: generateRandomPrice(),
        estimatedDays: getRandomDeliveryDays(),
        serviceType: getRandomServiceType()
      },
    ];
    setSuggestions(initialSuggestions);

    fetch('/api/shipSuggestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ suggestions: initialSuggestions.map(({ carrier, serviceType, price}) => ({ carrier, serviceType, price })) })
    })
    .then (response => response.json())
    .then (data => console.log(data))
    .catch (error => console.error("Error fetching shipping suggestions:", error));
  }, []);

  const handleSelect = async (id: number) => {

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('/api/auth/bookParcel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          senderAddress: {
            street: senderStreet,
            city: senderCity,
            state: senderState,
            country: senderCountry
          },
          receiverDetails: {
            firstName: receiverfName,
            lastName: receiverlName,
            street: receiverStreet,
            city: receiverCity,
            state: receiverState,
            country: receiverCountry
          },
          weight,
          volume,
          isFragile,
          description,
          category,
          shippingDate,
          selectedOption: suggestions.find(s => s.id === id)
        }),
      });

      if (response.ok) {
        alert('Parcel booking successful!');
        router.push('/home');
      } else {
        const data = await response.json();
        alert(data.message || 'Booking failed');
      }
    } catch (error) {
      console.error("Error booking parcel:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Shipping Options</h1>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className={styles.card}>
            <h2>{suggestion.carrier}</h2>
            <p>Service Type: {suggestion.serviceType}</p>
            <p>Estimated Delivery: {suggestion.estimatedDays} days</p>
            <p>From: {senderCity}, {senderCountry}</p>
            <p>To: {receiverCity}, {receiverCountry}</p>
            <p>Package Details:</p>
            <ul>
              <li>Weight: {weight} kg</li>
              <li>Volume: {volume} m³</li>
              <li>Fragile: {isFragile === 'yes' ? 'yes' : 'no'}</li>
            </ul>
            <p className={styles.price}>Price: ${suggestion.price}</p>
            <button
              className={styles.button}
              onClick={() => handleSelect(suggestion.id)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>


  );
};

export default ParcelSuggestions;