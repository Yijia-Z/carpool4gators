import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchResult({
    trip: {
        id,
        driver_id,
        start,
        destination,
        date,
        seat_count,
        available_seats,
        price,
    },
}) {
    const [hasJoined, setHasJoined] = useState(false);

    function handleJoinOrLeave() {
        const url = `/api/trips/${id}/${hasJoined ? 'cancel' : 'join'}`;
        const method = 'POST';
        const body = JSON.stringify({ user_id: 1, seats: 1 });

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body,
        }).then((response) => {
            if (response.ok) {
                setHasJoined((prevHasJoined) => !prevHasJoined);
            }
        });
    }

    return (
        <div data-cy="search-result">
            <Link to={`/driver/${driver_id}`} data-cy="driver-name">
                Driver: {driver_id}
            </Link>
            <div>Start: {start}</div>
            <div>Destination: {destination}</div>
            <div>Date: {date}</div>
            <div>Available Seats: {available_seats}</div>
            <div>Price: ${price.toFixed(2)}</div>
            <button onClick={handleJoinOrLeave} data-cy="join-leave-btn">
                {hasJoined ? 'Leave' : 'Join'}
            </button>
        </div>
    );
}

export default SearchResult;
