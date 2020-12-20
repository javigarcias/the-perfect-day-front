import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';



const Header = () => {
    return (
        <div className='header'>
            <div className='logo'>
                <img className='imgLogo' src='img/logo.jpg' alt='logo'></img>
            </div>
            <div className='userLogin'>

            </div>
            <div className='menu'>
                <Link to='/review'>Publica tu opinión</Link>
                <Link to='/events'>Eventos</Link>
                <Link to='/login'>Inicio Sesión</Link>
            </div>
            <div className='logout'>

            </div>
        </div>
    );
}

export default Header;
