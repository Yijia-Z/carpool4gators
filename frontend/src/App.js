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
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
