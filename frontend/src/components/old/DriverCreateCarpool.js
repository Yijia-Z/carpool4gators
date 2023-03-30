import React, { useState } from 'react';
import './DriverCreateCarpool.css';

function DriverCreateCarpool() {
    const [departureTime, setDepartureTime] = useState('');
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [seatCapacity, setSeatCapacity] = useState('');
    const [contactInformation, setContactInformation] = useState('');

    const handleDepartureTimeChange = (event) => {
        setDepartureTime(event.target.value);
    };

    const handleDepartureLocationChange = (event) => {
        setDepartureLocation(event.target.value);
    };

    const handleArrivalLocationChange = (event) => {
        setArrivalLocation(event.target.value);
    };

    const handleSeatCapacityChange = (event) => {
        setSeatCapacity(event.target.value);
    };

    const handleContactInformationChange = (event) => {
        setContactInformation(event.target.value);
    };

    const handleCreateCarpool = (event) => {
        event.preventDefault();
        // handle create carpool logic here
    };

    return (
        <div className="driver-create-carpool" >
            <h2>Create Carpool </h2>
            <form onSubmit={handleCreateCarpool} >
                <label htmlFor="departureTime" > Departure Time </label>
                <input
                    type="text"
                    id="departureTime"
                    value={departureTime}
                    onChange={handleDepartureTimeChange}
                    required
                />
                <label htmlFor="departureLocation" > Departure Location </label>
                <input
                    type="text"
                    id="departureLocation"
                    value={departureLocation}
                    onChange={handleDepartureLocationChange}
                    required
                />
                <label htmlFor="arrivalLocation" > Arrival Location </label>
                <input
                    type="text"
                    id="arrivalLocation"
                    value={arrivalLocation}
                    onChange={handleArrivalLocationChange}
                    required
                />
                <label htmlFor="seatCapacity" > Seat Capacity </label>
                <input
                    type="number"
                    id="seatCapacity"
                    value={seatCapacity}
                    onChange={handleSeatCapacityChange}
                    required
                />
                <label htmlFor="contactInformation" > Contact Information </label>
                <input
                    type="text"
                    id="contactInformation"
                    value={contactInformation}
                    onChange={handleContactInformationChange}
                    required
                />
                <button type="submit" > Create Carpool </button>
            </form>
        </div>
    );
}

export default DriverCreateCarpool;
