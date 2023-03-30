import React, { useState } from 'react';
import './Trip.css';

function Trip() {
    const [tripConfirmed, setTripConfirmed] = useState(false);

    const handleConfirmTrip = (event) => {
        event.preventDefault();
        setTripConfirmed(true);
        // handle confirm trip logic here
    };

    const handleCancelTrip = (event) => {
        event.preventDefault();
        setTripConfirmed(false);
        // handle cancel trip logic here
    };

    const handleRateDriver = (event) => {
        event.preventDefault();
        // handle rate driver logic here
    };

    return (
        <div className="trip">
            <h2>Trip Details</h2>
            <p>Driver Name: John Doe</p>
            <p>Departure Time: 10:00 am</p>
            <p>Departure Location: New York</p>
            <p>Arrival Location: Boston</p>
            <p>Seat Capacity: 3</p>
            {!tripConfirmed ? (
                <>
                    <button onClick={handleConfirmTrip}>Confirm Trip</button>
                    <button onClick={handleCancelTrip}>Cancel Trip</button>
                </>
            ) : (
                <form onSubmit={handleRateDriver}>
                    <label htmlFor="rating">Rate Driver:</label>
                    <select id="rating" required>
                        <option value="">Select a rating</option>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                    </select>
                    <button type="submit">Submit Rating</button>
                </form>
            )}
        </div>
    );
}

export default Trip;

