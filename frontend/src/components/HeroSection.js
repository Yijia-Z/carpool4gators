import React, { Component } from 'react';

class HeroSection extends Component {
    render() {
        return (
            <div className='hero-container'>
                <video src="/videos/video-2.mp4" autoPlay loop muted />
                <h1></h1>
                <p></p>
                <div className='hero-btns'>
                    <Button></Button>
                </div>
            </div>
        );
    }
}

export default HeroSection;