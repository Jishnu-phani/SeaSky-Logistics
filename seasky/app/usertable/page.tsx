'use client';
import React, { useEffect, useState } from 'react';
import styles from './PastBookings.module.css';

interface Booking {
  bookingId: string;
  origin: string;
  destination: string;
  date: string;
  modeOfTransport: string;
  startTime: string;
  actualEndTime: string;
}

interface Shipment {
  shipmentId: string;
  origin: string;
  destination: string;
  modeOfTransport: string;
  eta: string;
  actualEndTime: string;
}

const PastBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch bookings');
        }
        
        setBookings(data.bookings);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    const fetchShipments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/shipments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch shipments');
        }

        setShipments(data.shipments);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchBookings();
    fetchShipments();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Past Bookings</h1>
      {error && <p className={styles.error}>{error}</p>}
      
      {/* Past Bookings Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Mode of Transport</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.origin}</td>
                  <td>{booking.destination}</td>
                  <td>{booking.date}</td>
                  <td>{booking.modeOfTransport}</td>
                  <td>{booking.startTime}</td>
                  <td>{booking.actualEndTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No past bookings available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        <br></br>
      {/* Past Shipments Table */}
      <h2 className={styles.title}>Past Shipments</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Mode of Transport</th>
              <th>ETA</th>
              <th>Actual End Time</th>
            </tr>
          </thead>
          <tbody>
            {shipments.length > 0 ? (
              shipments.map((shipment) => (
                <tr key={shipment.shipmentId}>
                  <td>{shipment.shipmentId}</td>
                  <td>{shipment.origin}</td>
                  <td>{shipment.destination}</td>
                  <td>{shipment.modeOfTransport}</td>
                  <td>{shipment.eta}</td>
                  <td>{shipment.actualEndTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>No past shipments available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastBookings;
