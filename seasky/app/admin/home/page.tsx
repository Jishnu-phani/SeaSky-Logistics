'use client';
import { useRouter } from 'next/navigation';
import styles from './AdminHome.module.css';

export default function AdminHome() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button 
          className={styles.button}
          onClick={() => handleNavigation('/admin/no-fly')}
        >
          No-Fly List Management
        </button>
        <button 
          className={styles.button}
          onClick={() => handleNavigation('/admin/booking-status-management')}
        >
          Booking Status Management
        </button>
        <button 
          className={styles.button}
          onClick={() => handleNavigation('/admin/shipment-status')}
        >
          Shipment Status Management
        </button>
      </div>
    </div>
  );
}