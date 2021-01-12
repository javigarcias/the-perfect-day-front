import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { SHOW_COMMERCE } from '../../redux/types';

import axios from 'axios';

import './Home.scss';

const Home = (props) => {

    const history = useHistory();

    const [commerce, setCommerce] = useState("");
    const [city, setCity] = useState("");
    const [findCommerces, setFindCommerces] = useState([]);

    //Setea el tipo de comercio introducido desde select
    const handleCommerce = event => {
        event.preventDefault();
        setCommerce(event.target.value)      
    }

    //Setea la ciudad introducida desde select 
    const handleCity = event => {
        event.preventDefault();
        setCity(event.target.value)        
    }

    //Función para ver las opiniones del comercio seleccionado
    const showOpinions = async (commerce) => {
        //Guardamos todos los datos del comercio en REDUX
        props.dispatch({ type: SHOW_COMMERCE, payload: commerce });
        history.push('/opinion');
    }

    //Función que ejecuta el filtrado de comercios según el tipo y la ciudad
    const handleSearch = async () => {

        const searchBody = {
            type: commerce,
            city: city
        };
        await axios.post(process.env.REACT_APP_API_URL + '/commerces/typeAndCity', searchBody)
            .then((res) => {
                setFindCommerces(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        const effect = async () => {
            await handleSearch()
        }
        effect()
    }, []);
  
    return (
        <div className="home">
            <div className="menuButtons">
                <Link to="/restaurants" style={{ textDecoration: 'none' }}>
                    <button className="restaurant buttonsHome">Restaurantes</button>
                </Link>
                <Link to="/photographers" style={{ textDecoration: 'none' }}>
                    <button className="photographers buttonsHome">Fotógrafos</button>
                </Link>
                <Link to="/florist" style={{ textDecoration: 'none' }}>
                    <button className="florist buttonsHome">Floristerías</button>
                </Link>
                <Link to="/beauty" style={{ textDecoration: 'none' }}>
                    <button className="beauty buttonsHome">Belleza</button>
                </Link>
            </div>
            <div className="titleHome">
                <h2>Descubre los proveedores de boda mejor valorados</h2>
            </div>
            <div className="inputSearch">
                <select name="commerces" className="homeOption1" onChange={handleCommerce} >
                    <option selected value="0"> ¿Qué buscas? </option>                  
                        <option value="restaurantes">Restaurantes</option> 
                        <option value="fotografia">Fotógrafos</option> 
                        <option value="floristerias">Floristerías</option>   
                        <option value="belleza">Belleza</option>       
                </select>
                <select name="citys" className="homeOption2" onChange={handleCity}>
                    <option selected value="0"> ¿Dónde? </option>                  
                        <option value="Valencia">Valencia</option> 
                        <option value="Madrid">Madrid</option> 
                        <option value="Barcelona">Barcelona</option>   
                </select>
                <button className="search" onClick={() => { handleSearch() }} >BUSCAR</button>
            </div>
            <div className="inputDecoration">
                <img className='dots' src='img/dots.jpg' alt='dots'></img>
            </div>
            <div className="findCommerces">
               {findCommerces.map(commerce => {
                   return(
                    <div className="commerces" key={commerce.id}>
                        <div className="cardCommerces">
                            <h3>{commerce.name}</h3>
                            <img className="commerceImage" src={commerce.image}></img>
                            <div className="reviewCard">
                                <p>{commerce.review}</p>
                            </div>
                            <div className="buttonCard">
                            <button className="opinionButton" onClick={ () => { showOpinions(commerce) }}>Ver Opiniones</button>
                        </div>
                        </div>
                    </div>)
                }
            )}
            </div>
        </div>
    )
   
    
}

const mapStateToProps = state => {
    return {
        commerces: state.commerces,
    }
}

export default connect(mapStateToProps) (Home);