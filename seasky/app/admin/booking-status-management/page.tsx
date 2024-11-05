"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import styles from './TravelLogPage.module.css';

interface TravelLog {
    Log_ID: string;
    Travel_Status: string;
    Origin: string;
    Destination: string;
    Date: string;
    Mode_of_Transport: string;
    ETA: string;
    Actual_end_time: string;
    Start_time: string;
    Passenger_ID: string;
    Passport_Number: string;
}


const TravelLogPage: React.FC = () => {
    const router = useRouter();
    const [travelLogs, setTravelLogs] = useState<TravelLog[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<TravelLog[]>([]);
    const [passportSearch, setPassportSearch] = useState('');

    useEffect(() => {
        axios.get('/api/travel-log').then((response) => {
            setTravelLogs(response.data);
            setFilteredLogs(response.data);
        });
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassportSearch(value);
        setFilteredLogs(
            travelLogs.filter((log) =>
                log.Passport_Number.includes(value)
            )
        );
    };

    const handleStatusChange = async (logId: string, newStatus: string) => {
        try {
            await axios.put(`/api/travel-log/${logId}`, { Travel_Status: newStatus });
            setTravelLogs((prevLogs) =>
                prevLogs.map((log) =>
                    log.Log_ID === logId ? { ...log, Travel_Status: newStatus } : log
                )
            );
            setFilteredLogs((prevLogs) =>
                prevLogs.map((log) =>
                    log.Log_ID === logId ? { ...log, Travel_Status: newStatus } : log
                )
            );
        } catch (error) {
            console.error("Failed to update travel status", error);
        }
    };

    return (
        <>
        <div className={styles.background}></div>
        <div 
        className={styles.backButton}
        onClick={() => router.push('/admin/home')}
        >
            <Image
                src="/back-arrow.svg"
                alt="Back"
                width={20}
                height={20}
            />
      </div>
        <div className={styles.container}>
            <h1 className={styles.title}>Travel Log Records</h1>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={passportSearch}
                    onChange={handleSearch}
                    placeholder="Search by Passport Number"
                    className={styles.searchInput}
                />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {/* <th>Log ID</th> */}
                        <th>Passport Number</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Travel Date</th>
                        <th>Current Status</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map((log) => (
                        <tr key={log.Log_ID}>
                            {/* <td>{log.Log_ID}</td> */}
                            <td>{log.Passport_Number}</td>
                            <td>{log.Origin}</td>
                            <td>{log.Destination}</td>
                            <td>{log.Date}</td>
                            <td className={styles.statusCell}>
                                {log.Travel_Status}
                            </td>
                            <td>
                                <select
                                    value={log.Travel_Status}
                                    onChange={(e) => handleStatusChange(log.Log_ID, e.target.value)}
                                    className={styles.statusSelect}
                                >
                                    <option value="yet to board">Scheduled</option>
                                    <option value="yet to board">Yet to Board</option>
                                    <option value="onboarding">Onboarding</option>
                                    <option value="in flight">In Flight</option>
                                    <option value="arrived destination">Arrived Destination</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default TravelLogPage;