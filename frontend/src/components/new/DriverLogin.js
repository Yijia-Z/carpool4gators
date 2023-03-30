import React, { useState } from 'react';
import axios from 'axios';

const DriverLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/driver/login', { username, password });
            if (response.data.code === 0) {
                alert('Driver logged in successfully');
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert('Error logging in driver');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Driver Login</h2>
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
            <button type="submit">Login</button>
        </form>
    );
};

export default DriverLogin;