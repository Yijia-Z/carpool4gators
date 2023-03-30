import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            <ul className="temp-nav">
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
                <li>
                    <Link to='/search-trip'>
                        search
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default HeroSection;