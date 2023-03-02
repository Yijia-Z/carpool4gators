import React, { useState } from 'react';
import './SearchCarpool.css';

function SearchCarpool() {
    const [departureTime, setDepartureTime] = useState('');
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [seatCapacity, setSeatCapacity] = useState('');

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

    const handleSearchCarpool = (event) => {
        event.preventDefault();
        // handle search carpool logic here
    };

    return (
        <div className="search-carpool">
            <h2>Search Carpool</h2>
            <form onSubmit={handleSearchCarpool}>
                <label htmlFor="departureTime">Departure Time</label>
                <input
                    type="text"
                    id="departureTime"
                    value={departureTime}
                    onChange={handleDepartureTimeChange}
                />
                <label htmlFor="departureLocation">Departure Location</label>
                <input
                    type="text"
                    id="departureLocation"
                    value={departureLocation}
                    onChange={handleDepartureLocationChange}
                />
                <label htmlFor="arrivalLocation">Arrival Location</label>
                <input
                    type="text"
                    id="arrivalLocation"
                    value={arrivalLocation}
                    onChange={handleArrivalLocationChange}
                />
                <label htmlFor="seatCapacity">Seat Capacity</label>
                <input
                    type="number"
                    id="seatCapacity"
                    value={seatCapacity}
                    onChange={handleSeatCapacityChange}
                />
                <button type="submit">Search</button>
            </form>
            {/* List of search results */}
        </div>
    );
}

export default SearchCarpool;