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
        <Routes>
          <Route path='/' element={<HeroSection />} />
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/drivers-list' element={
            <DriverDetails
            name="John Smith"
            contact="555-1234"
            profilePicture="https://zy-j.com/images/avatar.png"
            departureTime="9:00am"
            departureLocation="123 Main St, Anytown, USA"
            destination="456 Oak Ave, Othertown, USA"
          />
          }/>
          <Route path='/driver' element={<Driver />} />
          <Route path='/create-carpool' element={<DriverCreateCarpool />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<SearchCarpool />} />
          <Route path='/trip' element={<Trip />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
