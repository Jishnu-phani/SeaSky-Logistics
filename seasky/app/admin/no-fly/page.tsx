// app/admin/no-fly/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './no-fly.module.css';
import Image from 'next/image';

type NoFlyEntry = {
  passportNumber: string;
  reason: string;
  dateAdded?: string;
};

export default function NoFlyPage() {
  const [searchPassportNumber, setSearchPassportNumber] = useState('');
  const [addPassportNumber, setAddPassportNumber] = useState('');
  const [reason, setReason] = useState('');
  const [searchResult, setSearchResult] = useState<NoFlyEntry | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/no-fly-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passportNumber: searchPassportNumber,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSearchResult({
          passportNumber: data.passportNumber,
          reason: data.reason,
          dateAdded: data.dateAdded,
        });
        setError('');
      } else {
        setError(data.message);
        setSearchResult(null);
      }
    } catch (err) {
      setError('Failed to search no-fly list');
      setSearchResult(null);
    }
  };  

  const handleAddToNoFly = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/no-fly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passportNumber: addPassportNumber,
          reason,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Successfully added to no-fly list');
        setAddPassportNumber('');
        setReason('');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to add to no-fly list');
    }
  };

  return (
    <div className={styles.container}>
      <div 
        className={styles.backButton}
        onClick={() => router.push('/admin/home')}
      >
        <Image
          src="/back-arrow.svg"
          alt="Back to Admin Home"
          width={24}
          height={24}
        />
      </div>
      <h1>No-Fly List Management</h1>
      
      {/* Search Form */}
      <div className={styles.section}>
        <h2>Search No-Fly List</h2>
        <form onSubmit={handleSearch} className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="searchPassport">Passport Number:</label>
            <input
              type="text"
              id="searchPassport"
              value={searchPassportNumber}
              onChange={(e) => setSearchPassportNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>

        {searchResult && (
          <div className={styles.result}>
            <h3>Search Result:</h3>
            <p>Passport Number: {searchResult.passportNumber}</p>
            <p>Date Added: {searchResult.dateAdded}</p>
            <p>Reason: {searchResult.reason}</p>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>

      {/* Add to No-Fly List Form */}
      <div className={styles.section}>
        <h2>Add to No-Fly List</h2>
        <form onSubmit={handleAddToNoFly} className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="addPassport">Passport Number:</label>
            <input
              type="text"
              id="addPassport"
              value={addPassportNumber}
              onChange={(e) => setAddPassportNumber(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="reason">Reason:</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Add to No-Fly List
          </button>
        </form>
      </div>
    </div>
  );
}