import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Header.scss';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';



const Header = (props) => {

    const history = useHistory();
    
    const logout = async () => {
        await axios.put(process.env.REACT_APP_API_URL + '/users/logout/' + props.user.email)
        props.dispatch({ type: LOGOUT, payload: {} });
        history.push('/');
    }
    return (
        <div className='header'>
            <div className='logo'>
                <Link to="/">
                    <img className='imgLogo' src='img/logo.jpg' alt='logo'></img>
                </Link>
            </div>
            <div className='userLogin'>{props.user.name}

            </div>
            <div className='menu'>
                <Link to='/'>Home</Link>
                <Link to='/review'>Publica tu opinión</Link>
                <Link to='/events'>Eventos</Link>
                <Link to='/login'>Inicio Sesión</Link>
            </div>
            <div className='logout'>
                <button className="buttons" onClick={logout}>SALIR</button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Header);
