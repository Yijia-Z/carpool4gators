import React, { useState } from 'react';
import axios from 'axios';

const ConfirmTrip = ({ tripId }) => {
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/trips/${tripId}/confirm`, { rating });
            alert(response.data.message);
        } catch (error) {
            alert('Error confirming trip');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Confirm Trip and Rate Driver</h2>
            <label htmlFor="rating">Rating:</label>
            <select
                name="rating"
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button type="submit">Confirm Trip</button>
        </form>
    );
};

export default ConfirmTrip;