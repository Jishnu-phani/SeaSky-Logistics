"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import styles from './ShipmentStatus.module.css';

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
    Shipment_ID: string;
    Package_ID: string;
    Category: string;
}

const TravelLogPage: React.FC = () => {
    const router = useRouter();
    const [travelLogs, setTravelLogs] = useState<TravelLog[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<TravelLog[]>([]);
    const [shipmentSearch, setshipmentSearch] = useState('');

    useEffect(() => {
        axios.get('/api/shipment-status').then((response) => {
            setTravelLogs(response.data);
            setFilteredLogs(response.data);
        });
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setshipmentSearch(value);
        setFilteredLogs(
            travelLogs.filter((log) =>
                log.Shipment_ID.includes(value)
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

    const handleRegulationStatusChange = async (logId: string, newStatus: string) => {
        try {
            await axios.put(`/api/goods/${logId}`, { Regulation_Status: newStatus });
        } catch (error) {
            console.error("Failed to update regulation status", error);
        }
    };

    const handleVerify = async (logId: string) => {
        await handleStatusChange(logId, "Waiting to be picked up");
        await handleRegulationStatusChange(logId, "Verified");
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
                    value={shipmentSearch}
                    onChange={handleSearch}
                    placeholder="Search by Shipment ID"
                    className={styles.searchInput}
                />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Shipment ID</th>
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
                            <td>{log.Shipment_ID}</td>
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
                                    <option value="yet to be verified">Yet to be Verified</option>
                                    <option value="waiting to be picked up">Waiting to be picked up</option>
                                    <option value="in transit">In Transit</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.container}>
            <h1 className={styles.title}>Regulation Status update</h1>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={shipmentSearch}
                    onChange={handleSearch}
                    placeholder="Search by Shipment ID"
                    className={styles.searchInput}
                />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Shipment ID</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Travel Date</th>
                        <th>Current Status</th>
                        <th>Category</th>
                        <th>Verify</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map((log) => (
                        <tr key={log.Log_ID}>
                            <td>{log.Shipment_ID}</td>
                            <td>{log.Origin}</td>
                            <td>{log.Destination}</td>
                            <td>{log.Date}</td>
                            <td className={styles.statusCell}>
                                {log.Travel_Status}
                            </td>
                            <td>{log.Category}</td>
                            <td>
                            <button
    onClick={() => handleVerify(log.Log_ID)}
    className={styles.verifyButton}
>
    Verify
</button>
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