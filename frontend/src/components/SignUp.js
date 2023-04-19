import React, { useRef, useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import './SignUp.css';
import UserStore from '../stores/UserStore';
import SubmitButton from './SubmitButton';
import Navbar from './Navbar';
import { Nav } from 'react-bootstrap';

function SignUp() {
        const [values, setValues] = useState({
            name: "",
            email: "",
            birthday: "",
            phone: "",
            password: "",
            confirmPassword: ""
        });

        const navigate = useNavigate();
        useEffect(()=>{
            if(localStorage.getItem('user-info'))
            {
                navigate('/search-trip')
            }
        },[])

        const inputs = [
            {
                id:1,
                name:"name",
                type:"text",
                placeholder:"Full Name",
                //errorMessage: "name should be 3-16 characters and shouldn't include any special character!",
                label:"name",
                //pattern: "^[A-Za-z0-9]{3,16}$",
                required: true,
            },
            /*
            {
                id:2,
                name:"email",
                type:"email",
                placeholder:"Email",
                //rrorMessage: "It should be a valid email address!",
                label:"Email", 
                required: true,
            },
            {
                id:3,
                name:"birthday",
                type:"date",
                placeholder:"Birthday",
                label:"Birthday"
            },
            */
            {
              id: 4,
              name:"phone",
              type:"text",
              placeholder:"phone number",
              label:"Phone"
            },
            {
                id:5,
                name:"password",
                type:"password",
                placeholder:"Password",
                //errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
                label:"Password",
                //pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
                required: true,
            },
            {
                id:6,
                name:"confirmPassword",
                type:"password",
                placeholder:"ConfirmPassword",
                //errorMessage: "Passwords don't match!",
                label:"ConfirmPassword",
                //pattern: values.password,
                required: true,
            }
        ]
    
        const handleSubmit = (e) => {
            e.preventDefault();// prevent refresh of the page when clicked
            doSignUp()
        }


        const onChange = (e) => {
            setValues({...values, [e.target.name]: e.target.value})
        }

        console.log(values);

        const doSignUp = async () => {
          // right now the backend only takes name, password, and phone
            const { name, password, phone} = values;
          
            // post of JSON file
            try {
              let item = {name, password, phone}
              console.warn(item)

              let res = await fetch('http://localhost:18080/user/add_user', {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
              });

              // Check if the response is ok (status code in the 200-299 range)
              if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
              }
          
              let result = await res.json();
              
              
              if (result) {
                UserStore.isLoggedIn = true;
                UserStore.name = result.name;
                // store user information in localStorage on Web
                localStorage.setItem('user-info',JSON.stringify({
                  id: result.data.id,
                  name: result.data.name,
                  phone: result.data.phone,
                  password: result.data.password
                }));
                navigate("/search-trip");
              };
              

            } catch (e) {
              console.log(e);
            }
          };
          
/*
        if (UserStore.loading) {
            return (
              <div className="app">
                <div className="container">
                  Loading, please wait..
                </div>
              </div>
            )
          }
        
          else {
        
              if (UserStore.isLoggedIn) {
                return (
                  <div className="app">
                    <div className="container">
                      Welcome {UserStore.name}
        
                      <SubmitButton
                        text={'Log out'}
                        disable={false}
                        onClick={ () => this.doLogOut() }
                      />
        
                    </div>
                </div>
                )
              }
*/
              return (
                <>
                  <Navbar />
                  <div className='signup-container'>
                      <div className='form-wrapper'>
                          <form onSubmit={handleSubmit}>
                              <h1>Register</h1>
                              {
                                  inputs.map((input) => (
                                      <FormInput 
                                          key={input.id} 
                                          {...input} 
                                          value={values[input.name]} 
                                          onChange={onChange} 
                                      />
                                  ))
                              }
                              <SubmitButton
                                  text={'Submit'}
                                  disable={false}
                                  onClick={ doSignUp }
                              />
                              <p className="login-text">
                                  Already have an account? <Link to='/log-in'>Log In</Link>
                              </p>
                          </form>
                      </div>
                  </div>
                </>
            );
            
 //      }

    }


        

export default SignUp;