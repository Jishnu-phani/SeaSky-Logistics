'use client'; 

import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import styles from './page.module.css';

export default function TravelBooking() {
  const router = useRouter(); 

  const sections = [
    {
      title: 'Flights',
      description: 'Search Flights to our most popular destinations',
      buttonText: 'Show Flights',
      image: '/plane.jpg',
      route: '/flights',
    },
    {
      title: 'Shipments',
      description: 'Find your preferred reliable delivery partner to get your goods to their destination',
      buttonText: 'Book Shipment',
      image: '/parcel.jpg',
      route: '/parcel',
    },
    {
      title: 'Search Past Bookings',
      description: 'Look for your past bookings and check their status',
      buttonText: 'Search Bookings',
      image: '/parcel.jpg',
      route: '/usertable',
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {sections.map((section) => (
          <div key={section.title} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={section.image}
                alt={section.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className={styles.overlay}>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <button 
                  className={styles.button} 
                  onClick={() => router.push(section.route)}
                >
                  {section.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}