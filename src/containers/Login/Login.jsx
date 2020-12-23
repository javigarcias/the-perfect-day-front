import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import './Login.scss';


const Login = () => {
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página

        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        axios.post('http://localhost:3000/users/login', user)
            .then(res => {
                /*localStorage.setItem("user", JSON.stringify(res.data));
                if(res.data.rol === "0"){
                    history.push("/perfil")

                }else{
                    history.push("/admin")
                }
                 setTimeout(() => {
                    history.push("/perfil")
                }, 1000); */

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

export default Login
