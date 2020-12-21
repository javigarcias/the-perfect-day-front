import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import './Register.scss';

const Register = () => {

    const history = useHistory();
    const [messageOk, setMessageOk] = useState();
    const [messageError, setMessageError] = useState();

    const handleSubmit = event => {
        event.preventDefault(); 
        
        const user = {
            name: event.target.name.value,
            surname: event.target.surname.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };
        axios.post('http://localhost:3000/users/register', user)
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                setMessageOk(`${res.data.name} Registrado correctamente`);
                setTimeout(() => {
                    history.push("/profile")
                }, 1500);

            })
            .catch(error => setMessageError(error.response.data.message));
    }
    return (
        <div className="register">
            <div className="logoRegister">
                <img className='imgLogoRegister' src='img/logo-register.jpg' alt='registrate'></img>
            </div>
            <div className='form'>
                <form className='register-form' onSubmit={handleSubmit}>
                    <div className='inputName'>Nombre</div>
                    <div>
                        <input type='text' name='name' required />
                    </div>
                    <div className='inputName'>Apellidos</div>
                    <div>
                        <input type='text' name='surname' required />
                    </div>
                    <div className='inputName'>Email</div>
                    <div>
                        <input type='email' name='email' required />
                    </div>
                    <div className='inputName'>Password</div>
                    <div>
                        <input type='password' name='password' required />
                    </div>
                    <div className='buttons'>
                        <button className='registerButton' type='submit'>Registrar</button>
                        <div className='homeLink'>
                            <Link to="/">Volver</Link>
                        </div>          
                    </div>
                    <div className='okMessage'>
                        {messageOk}
                    </div>
                    <div className='mensajeError'>
                        {messageError}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
