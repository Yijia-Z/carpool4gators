import React, { useState } from 'react';
import axios from 'axios';

const DriverRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/driver/register', { username, password, email, phone });
            if (response.data.code === 0) {
                alert('Driver registered successfully');
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert('Error registering driver');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Driver Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default DriverRegister;