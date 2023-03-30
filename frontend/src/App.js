import React, { useState, useEffect} from 'react';
import  { observer } from 'mobx-react';
import Navbar from './components/Navbar';
import Driver from './components/Driver';
import DriverCreateCarpool from './components/DriverCreateCarpool';
import DriverDetails from './components/DriverDetails';
import LogIn from './components/LogIn';
import Register from './components/Register';
import SearchCarpool from './components/SearchCarpool';
import Trip from './components/Trip';
import SignUp from './components/SignUp';
import Log_In from './components/Log_In';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/DriverDetails.css';
import HeroSection from './components/HeroSection';
import UserStore from './stores/UserStore';
import SearchTrips from './components/new/SearchTrips';
import ConfirmTrip from './components/new/ConfirmTrip';





function App() {

  //const [showNavbar, setShowNavbar] = useState(true);
  //const handleSignUpClick = () => setShowNavbar(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function checkLoggedInStatus() {
      try {
        let res = await fetch('/isLoggedIn', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        let result = await res.json();

        if (result && result.success) {
          UserStore.loading = false;
          UserStore.isLoggedIn = true;
          UserStore.username = result.username;
        } else {
          UserStore.loading = false;
          UserStore.isLoggedIn = false;
        }
      } catch (e) {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }

    checkLoggedInStatus();
  }, []);

  useEffect(() => {
    async function doLogOut() {
      try {
        let res = await fetch('/isLoggedIn', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        let result = await res.json();

        if (result && result.success) {
          UserStore.isLoggedIn = false;
          UserStore.username = '';
        }

      } catch (e) {
          console.log(e)
      }
    }

    doLogOut();
  }, []);

    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path='search-trip' element={<SearchTrips/>}/>
            <Route path='/' element={<HeroSection />} />
            <Route path='/sign-up' element={<SignUp isLoggedIn={isLoggedIn}/>}/>
            <Route path='/log-in' element={<Log_In />}/>
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


export default observer(App);
