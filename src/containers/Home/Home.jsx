import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => {
/*
    const search = async ()=> {
        let search = {
            type: 
        }
    }
  */
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
                        <option value="restaurantes">Restaurantes</option> 
                        <option value="fotografos">Fotógrafos</option> 
                        <option value="floristerias">Floristerías</option>   
                        <option value="belleza">Belleza</option>       
                </select>
                <select name="citys" className="homeOption2">
                    <option selected value="0"> ¿Dónde? </option>                  
                        <option value="valencia">Valencia</option> 
                        <option value="madrid">Madrid</option> 
                        <option value="barcelona">Barcelona</option>   
                </select>
                <button className="search"  >BUSCAR</button>
            </div>
            <div className="inputDecoration">
                <img className='dots' src='img/dots.jpg' alt='dots'></img>
            </div>
        </div>
    )
   
    
}


export default Home;