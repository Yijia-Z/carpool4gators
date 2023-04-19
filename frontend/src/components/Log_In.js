import React, { useRef, useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import './Log_In.css';
import UserStore from '../stores/UserStore';
import SubmitButton from './SubmitButton';
import Navbar from './Navbar';

function Log_In() {
        const [values, setValues] = useState({
            username: "",
            password: "",
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
                name:"phone",
                type:"text",
                placeholder:"Phone number",
                label:"Phone",
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

            const { phone, password } = values;
            let item = {phone, password};

            try {

                let res = await fetch ('http://localhost:18080/user/login', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(item),
                    });

                    // Check if the response is ok (status code in the 200-299 range)
                    if (!res.ok) {
                        throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
                    }
                   
                    let result = await res.json();

                    if (result) {
                        //UserStore.isLoggedIn = true;
                        //UserStore.username = result.username;
                        localStorage.setItem('user-info', JSON.stringify({
                            id: result.data.id,
                            name: result.data.name,
                            phone: result.data.phone,
                            password: result.data.password
                          }))
                        navigate("/search-trip")
                    }
            }
            catch(e) {
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
*/
              return (
                <>
                    <Navbar />
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
                                    onClick={ () => doLogIn() }
                                />
                                <p className="login-text">
                                    Don't have an account? <Link to='/sign-up'>SignUp</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </>
            );
//        }

    }

        

export default Log_In;