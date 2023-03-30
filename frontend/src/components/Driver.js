import React from 'react';
import './Driver.css';

function Driver() {
    const driver = {
        name: 'Driver Name',
        profilePicture: 'https://zy-j.com/images/avatar.png',
        departureTime: '8:00 AM',
        departureLocation: '123 Main St, Anytown USA',
        arrivalLocation: '456 Park Ave, Anytown USA',
        remainingSeats: 3,
        passengerRatings: [4, 5, 3],
        contactInformation: 'john.doe@example.com'
    };

    const handleEditInformation = () => {
        // handle edit information logic here
    };

    const handleRequestJoin = () => {
        // handle request join logic here
    };

    return (
        <div className="driver">
            <div className="driver-info">
                <img src={driver.profilePicture} alt="Profile" />
                <h2>{driver.name}</h2>
                <p>{driver.departureTime}</p>
                <p>{driver.departureLocation} to {driver.arrivalLocation}</p>
                <p>Remaining seats: {driver.remainingSeats}</p>
                <p>Passenger ratings: {driver.passengerRatings.join(', ')}</p>
                <p>Contact: {driver.contactInformation}</p>
                <button onClick={handleEditInformation}>Edit Information</button>
            </div>
            <div className="driver-requests">
                <h2>Requests to Join</h2>
                <ul>
                    <li>Passenger 1</li>
                    <li>Passenger 2</li>
                    <li>Passenger 3</li>
                </ul>
                <button onClick={handleRequestJoin}>Request to Join</button>
            </div>
        </div>
    );
}

export default Driver;
