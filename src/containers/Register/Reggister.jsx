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
        <div className="general">
            <div className="headerReg">
                <div className="logoRegistro"></div>
            </div>
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h4>Nombre <input type="text" name="name" required /></h4>
                    <h4>Apellidos <input type="text" name="surname" required /></h4>
                    <h4>Email <input type="email" name="email" required /></h4>
                    <h4>Password <input type="password" name="password" required /></h4>
                    <div className="botones">
                        <div className="registro">
                            <button className="botonesAccion" type="submit">Registrar</button>
                            <div className="homeLink">
                                <Link to="/">Volver</Link>
                            </div>
                        </div>
                    </div>
                    <div className="mensajeOk">
                        {messageOk}
                    </div>
                    <div className="mensajeError">
                        {messageError}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
