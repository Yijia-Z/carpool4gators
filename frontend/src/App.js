import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Driver from './components/Driver';
import DriverCreateCarpool from './components/DriverCreateCarpool';
import DriverDetails from './components/DriverDetails';
import LogIn from './components/LogIn';
import Register from './components/Register';
import SearchCarpool from './components/SearchCarpool';
import Trip from './components/Trip';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/DriverDetails.css';
import HeroSection from './components/HeroSection';


function App() {

  //const [showNavbar, setShowNavbar] = useState(true);

  //const handleSignUpClick = () => setShowNavbar(false);

  return (
    <>
      <Router>
        <Navbar />
        <Driver />
        <DriverCreateCarpool />
        <LogIn />
        <Register />
        <SearchCarpool />
        <Trip />
        <Routes>
          <Route path='/' exact />
          <Route path='/sign-up' element={<SignUp />}/>
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
