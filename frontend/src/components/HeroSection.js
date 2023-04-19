import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import Navbar from './Navbar';
import { Nav } from 'react-bootstrap';

function HeroSection() {
    return (
        <>
        <Navbar />
        <div className='hero-container'>
            <ul className="temp-nav">
                <h1>
                    old stuff
                </h1>
                <li>
                    <Link to='/drivers-list'>
                        Drivers List
                    </Link>
                </li>
                <li>
                    <Link to='/driver'>
                        driver
                    </Link>
                </li>
                <li>
                    <Link to='/create-carpool'>
                        create-carpool
                    </Link>
                </li>
                <li>
                    <Link to='/login'>
                        login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        register
                    </Link>
                </li>
                <li>
                    <Link to='/search'>
                        search
                    </Link>
                </li>
                <li>
                    <Link to='/trip'>
                        trip
                    </Link>
                </li>
                <h1>
                        new stuff
                </h1>
                <li>
                    <Link to='/search-trip'>
                        search
                    </Link>
                </li>
                <li>
                    <Link to='/confirm-trip'>
                        confirm
                    </Link>
                </li>
                <li>
                    <Link to='/create-trip'>
                        create
                    </Link>
                </li>
                <li>
                    <Link to='/driver-info'>
                        driver info
                    </Link>
                </li>
                <li>
                    <Link to='/driver-login'>
                        driver login
                    </Link>
                </li>
                <li>
                    <Link to='/user-login'>
                        user login
                    </Link>
                </li>
                <li>
                    <Link to='/user-register'>
                        user register
                    </Link>
                </li>
            </ul>
        </div>
        </>
    );
}

export default HeroSection;