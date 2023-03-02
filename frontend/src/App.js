import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DriverDetails from './components/DriverDetails';
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
        <Routes>
          <Route path='/' exact />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
