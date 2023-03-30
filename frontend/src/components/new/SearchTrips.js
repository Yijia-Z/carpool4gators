import React, { useState } from 'react';
import axios from 'axios';

const SearchTrips = () => {
    const [start, setStart] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [seatCount, setSeatCount] = useState(1);
    const [trips, setTrips] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/trips', { params: { start, destination, date, seat_count: seatCount } });
            setTrips(response.data);
        } catch (error) {
            alert('Error searching trips');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Search Trips</h2>
                <input
                    type="text"
                    placeholder="Start"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Seat Count"
                    value={seatCount}
                    onChange={(e) => setSeatCount(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {trips.map((trip) => (
                    <li key={trip.id}>
                        {trip.start} - {trip.destination} ({trip.date}) - {trip.available_seats} seats available - ${trip.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchTrips;