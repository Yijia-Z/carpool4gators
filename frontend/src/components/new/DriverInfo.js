import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverInfo = ({ driverId }) => {
    const [driverInfo, setDriverInfo] = useState(null);

    useEffect(() => {
        const fetchDriverInfo = async () => {
            try {
                const response = await axios.get(`/api/driver/${driverId}`);
                if (response.data.code === 0) {
                    setDriverInfo(response.data);
                } else {
                    alert(response.data.msg);
                }
            } catch (error) {
                alert('Error fetching driver information');
            }
        };

        fetchDriverInfo();
    }, [driverId]);

    return (
        <div>
            <h2>Driver Information</h2>
            {driverInfo && (
                <ul>
                    <li>Driver ID: {driverInfo.driver_id}</li>
                    <li>Username: {driverInfo.username}</li>
                    <li>Email: {driverInfo.email}</li>
                    <li>Phone: {driverInfo.phone}</li>
                    <li>Rating: {driverInfo.rating}</li>
                </ul>
            )}
        </div>
    );
};

export default DriverInfo;