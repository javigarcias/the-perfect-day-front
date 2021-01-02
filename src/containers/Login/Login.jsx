import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {LOGIN} from '../../redux/types';



import './Login.scss';


const Login = (props) => {
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault(); 

        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        axios.post(process.env.REACT_APP_API_URL + '/users/login', user)
            .then(res => {
                console.log(res);
                localStorage.setItem("user", JSON.stringify(res.data));
                props.dispatch({ type: LOGIN, payload: res.data });
                 setTimeout(() => {
                    history.push("/profile")
                }, 1000); 

            })
            .catch(error => console.log(error.response.data))
    }
    return (
        <div className="login">
            <div className="logoRegister">
                <img className='imgLogoRegister' src='img/logo-login.jpg' alt='registrate'></img>
            </div>
            <div className="formRegister">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className='inputName'>Email</div>
                    <div>
                        <input type='email' name='email' required />
                    </div>
                    <div className='inputName'>Password</div>
                    <div>
                        <input type='password' name='password' required />
                    </div>
                    <div className="buttons">
                        <button className='registerButton' type='submit'>Login</button>
                        <div className='homeLink'>
                            <Link to="/register">Regístrate</Link>
                        </div>          
                    </div>         
                </form>
            </div>
        </div>
    )
}


export default connect()(Login);
