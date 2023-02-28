import React from 'react';
import Navbar from './components/Navbar';
import DriverDetails from './components/DriverDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/DriverDetails.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact />
        </Routes>
      </Router>
      //driver details example
      <div>
        <DriverDetails
          name="John Smith"
          contact="555-1234"
          profilePicture="https://zy-j.com/images/avatar.png"
          departureTime="9:00am"
          departureLocation="123 Main St, Anytown, USA"
          destination="456 Oak Ave, Othertown, USA"
        />
      </div>
    </>
  );
}

export default App;
