import { Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faTimes, faBars} from '@fortawesome/free-solid-svg-icons';
import { Button } from './Button.js';
import './Button.css';
import './Navbar.css';

function Navbar()
{
    // get user id after logged in
    let user = JSON.parse(localStorage.getItem('user-info'))
    console.warn(user)
    const navigate = useNavigate();
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const location = useLocation();

    const showButton = () => {
        if (location.pathname === '/sign-up') {
            setButton(false);
        }
        if(window.innerWidth <= 960) {
            setButton(false);
        } else{
            setButton(true);
        }
    };

    useEffect(() =>{
        showButton();
    },[location.pathname]);

    window.addEventListener('resize', showButton);


    function LogOut()
    {
        localStorage.clear();
        navigate("/sign-up");
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        Carpool4Gator &nbsp; <FontAwesomeIcon icon={faTruckFast} />
                        {/*&nbsp works as space*/}
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <FontAwesomeIcon icon={click ? faTimes : faBars} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/Home' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Service' className='nav-links' onClick={closeMobileMenu}>
                            About Us
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Products' className='nav-links' onClick={closeMobileMenu}>
                                Contact/Support
                            </Link>
                        </li>
                        {
                            localStorage.getItem('user-info') ?
                            <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu && LogOut}>
                                Log Out
                            </Link>
                            </li>
                            :
                            <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign up
                            </Link>
                            </li>
                        }
                    </ul>
                    {
                        localStorage.getItem('user-info') ?
                        <DropdownButton id="dropdown-basic-button" title={user.name}>
                            <button>
                                <Dropdown.Item href="#/action-1" onClick={LogOut}>Log Out</Dropdown.Item>
                            </button> 
                        </DropdownButton>
                        :
                        (button && <Button buttonStyle='btn--outline'>SIGN UP</Button>)
                    }
                </div>
            </nav>
        </>
    );
}

export default Navbar 