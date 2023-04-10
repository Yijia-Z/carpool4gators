import React, { useRef, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import FormInput from './FormInput';
import './Log_In.css';
import UserStore from '../stores/UserStore';
import SubmitButton from './SubmitButton';

function Log_In() {
        const [values, setValues] = useState({
            username: "",
            password: "",
        });

        const inputs = [
            {
                id:1,
                name:"username",
                type:"text",
                placeholder:"Username",
                label:"Username",
                required: true,
            },
            {
                id:2,
                name:"password",
                type:"password",
                placeholder:"Password",
                label:"Password",
                required: true,
            },
        ]
    
        const handleSubmit = (e) => {
            e.preventDefault();// prevent refresh of the page when clicked
            doLogIn();
        }


        const onChange = (e) => {
            setValues({...values, [e.target.name]: e.target.value})
        }

        const [formKey, setFormKey] = useState(0);

        console.log(values);

        const doLogIn = async () => {

            const { username, password } = values;
            
            try {

                let res = await fetch ('http://localhost:18080/user/login', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: values.username,
                            password: values.password
                        })
                    });

                    let result = await res.json();
                    if (result && result.success) {
                        UserStore.isLoggedIn = true;
                        UserStore.username = result.username;
                    }

                    else if (result && result.success === false) {
                        alert(result.msg);
                        setValues({
                            username: '',
                            password: '',
                        });
                        // Update the form key to force a re-render
                        setFormKey((prevKey) => prevKey + 1);
                    }
                }

            catch(e) {
                console.log(e);
            }
        }

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
                        <form key={formKey} onSubmit={handleSubmit}>
                            <h1>Login</h1>
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
                                text={'Login'}
                                disable={false}
                                onClick={ doLogIn() }
                            />
                            <p className="login-text">
                                Don't have an account? <Link to='/sign-up'>SignUp</Link>
                            </p>
                        </form>
                    </div>
                </div>
            );
        }

    }

        

export default Log_In;