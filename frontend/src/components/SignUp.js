import React, { useRef, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import FormInput from './FormInput';
import './SignUp.css';
import UserStore from '../stores/UserStore';
import SubmitButton from './SubmitButton';

function SignUp() {
        const [values, setValues] = useState({
            username: "",
            email: "",
            birthday: "",
            password: "",
            confirmPassword: ""
        });

        const inputs = [
            {
                id:1,
                name:"username",
                type:"text",
                placeholder:"Username",
                //errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
                label:"Username",
                //pattern: "^[A-Za-z0-9]{3,16}$",
                required: true,
            },
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
            {
                id:4,
                name:"password",
                type:"password",
                placeholder:"Password",
                //errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
                label:"Password",
                //pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
                required: true,
            },
            {
                id:5,
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
            const { username, email, password } = values;
          
            try {
              let res = await fetch('http://localhost:18080/user/add_user', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username,
                  password,
                  email,
                  phone: '123456789',
                }),
              });
          
              // Check if the response is ok (status code in the 200-299 range)
              if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
              }
          
              let result = await res.json();
              if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
              } else if (result && result.success === false) {
                alert(result.msg);
                setValues({
                  username: '',
                  password: '',
                  email: '',
                });
              }
            } catch (e) {
              console.log(e);
            }
          };
          

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
                      Welcome {UserStore.username}
        
                      <SubmitButton
                        text={'Log out'}
                        disable={false}
                        onClick={ () => this.doLogOut() }
                      />
        
                    </div>
                </div>
                )
              }

              return (
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
            );
        }

    }

        

export default SignUp;