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
        //REGEX Email valido
        let regexEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
        //REGEX Pass entre 8 y 10 caracteres con Mayusculas, minúsculas y caracter especial
        let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

        //Comprobación requerimientos REGEX de Email
        if(!regexEmail.test(event.target.email.value)){
            setMessageError("El email introducido no es válido");
            return;
        }
        //Comprobación requerimientos REGEX de Password
        if(!regexPassword.test(event.target.password.value)){
            setMessageError("El Pasword debe contener entre 8 y 10 caracteres con mayúsculas, minúsculas y caracter especial");
            return;
        }

        const user = {
            name: event.target.name.value,
            surname: event.target.surname.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };
        axios.post(process.env.REACT_APP_API_URL + '/users/register', user)
            .then(res => {
                setMessageOk("Registrado correctamente");
                setTimeout(() => {
                    history.push("/login")
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
                    <div className="regexPass">
                        *Debe contener entre 8 y 10 caracteres con mayúsculas, minúsculas y caracter especial.
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
                    <div className='errorMessage'>
                        {messageError}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
