import React, { useState } from 'react';
import axios from 'axios';

const CreateTrip = () => {
    const [start, setStart] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [seatCount, setSeatCount] = useState(1);
    const [price, setPrice] = useState(0);
    const [contactInfo, setContactInfo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/trips', { start, destination, date, seat_count: seatCount, price, contact_info: contactInfo });
            if (response.data.id) {
                alert('Trip created successfully');
            } else {
                alert('Error creating trip');
            }
        } catch (error) {
            alert('Error creating trip');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Trip</h2>
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
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Contact Info"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
            />
            <button type="submit">Create Trip</button>
        </form>
    );
};

export default CreateTrip;