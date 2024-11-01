// page.tsx
'use client'; // Ensure this component is a Client Component

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import styles from './page.module.css';

export default function TravelBooking() {
  const router = useRouter(); // Initialize the router

  const sections = [
    {
      title: 'Flights',
      description: 'Search Flights to our most popular destinations',
      buttonText: 'Show Flights',
      image: '/Small-Islands-Header-Image-Web.jpg',
      route: '/flights', // Define the route for flights
    },
    {
      title: 'Shipments',
      description: 'Find your preferred reliable delivery partner to get your goods to their destination',
      buttonText: 'Book Shipment',
      image: '/Small-Islands-Header-Image-Web.jpg',
      route: '/parcel', // Define the route for shipments
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
                  onClick={() => router.push(section.route)} // Add onClick event to redirect
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