import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => {
  
    return (
        <div className="home">
            <div className="menuButtons">
                <Link to="/restaurants" style={{ textDecoration: 'none' }}>
                    <button className="restaurant buttonsHome">Restaurantes</button>
                </Link>
                <Link to="/photoraphers" style={{ textDecoration: 'none' }}>
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
            <select name="commerces" className="homeOption1">
                <option selected value="0"> ¿Qué buscas? </option>                  
                    <option value="1">Restaurantes</option> 
                    <option value="2">Fotógrafos</option> 
                    <option value="3">Floristerías</option>   
                    <option value="4">Belleza</option>       
            </select>
            <select name="citys" className="homeOption2">
                <option selected value="0"> ¿Dónde? </option>                  
                    <option value="1">Valencia</option> 
                    <option value="2">Madrid</option> 
                    <option value="3">Barcelona</option>   
            </select>
            <button className="search">BUSCAR</button>
            </div>
        </div>
    )
   
    
}


export default Home;