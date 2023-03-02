import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className='hero-container'>
            <Link to='/drivers-list'>
                Drivers List
            </Link>
        </div>
    );
}

export default HeroSection;