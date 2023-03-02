import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Driver from './components/Driver';
import DriverCreateCarpool from './components/DriverCreateCarpool';
import SearchCarpool from './components/SearchCarpool';
import Trip from './components/Trip';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/driver' component={Driver} />
          <Route path='/create-carpool' component={DriverCreateCarpool} />
          <Route path='/search-carpool' component={SearchCarpool} />
          <Route path='/trip' component={Trip} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
