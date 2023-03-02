import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        // handle login logic here
    };

    const handleRegistration = (event) => {
        event.preventDefault();
        // handle registration logic here
    };

    return (
        <div className="login" >
            <h2>Login </h2>
            <form onSubmit={handleLogin} >
                <label htmlFor="phoneNumber" > Phone Number </label>
                < input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                />
                <label htmlFor="password" > Password </label>
                < input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <button type="submit" > Login </button>
            </form>
            <p> Don't have an account? <a href="/register" onClick={handleRegistration}>Register now</a></p>
        </div>
    );
}

export default Login;
