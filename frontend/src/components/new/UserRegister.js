import React, { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/add_user', { username, password, email, phone });
            if (response.data.code === 0) {
                alert('User registered successfully');
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert('Error registering user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>User Register</h2>
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

export default UserRegister;