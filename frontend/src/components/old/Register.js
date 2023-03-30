import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>

            <p>
                Already registered ? <Link to="/login" > Log in here </Link></p >
        </div>
    );
}

export default Register;

