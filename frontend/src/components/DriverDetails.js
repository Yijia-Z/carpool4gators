import React from 'react';
import './DriverDetails.css';

function DriverDetails({ name, contact, profilePicture, departureTime, departureLocation, destination }) {
    return (
        <div>
            <h2>{name}</h2>
            <img src={profilePicture} alt={`${name}'s profile`} />
            <p>Contact: {contact}</p>
            <p>Departure Time: {departureTime}</p>
            <p>Departure Location: {departureLocation}</p>
            <p>Destination: {destination}</p>
        </div>
    );
}

export default DriverDetails;