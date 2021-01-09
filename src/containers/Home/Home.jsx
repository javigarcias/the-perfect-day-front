import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Home.scss';

const Home = () => {

    const [commerce, setCommerce] = useState("");
    const [city, setCity] = useState("");
    const [findCommerces, setFindCommerces] = useState([]);


    const handleCommerce = event => {
        setCommerce(event.target.value)
        
    }
    const handleCity = event => {
        setCity(event.target.value)
        
    }



    const handleSearch = async (event) => {

        //event.preventDefault();
        console.log('Entra en Search....','TYPE:',commerce,'CITY:',city)
        const searchBody = {
            type: commerce,
            city: city
        };
        await axios.get(process.env.REACT_APP_API_URL + '/commerces/typeAndCity', searchBody)
        .then((res) => {
            setFindCommerces(res.data);
            return findCommerces;

        }).catch((err) => {
        console.log(err);

      });

    }


    useEffect( () => {

        const effect = async () =>{
    
        await handleSearch()
    
      }
      effect ()
      
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
                        <option value="fotografos">Fotógrafos</option> 
                        <option value="floristerias">Floristerías</option>   
                        <option value="belleza">Belleza</option>       
                </select>
                <select name="citys" className="homeOption2" onChange={handleCity}>
                    <option selected value="0"> ¿Dónde? </option>                  
                        <option value="valencia">Valencia</option> 
                        <option value="madrid">Madrid</option> 
                        <option value="barcelona">Barcelona</option>   
                </select>
                <button className="search" onClick={() => { handleSearch() }} >BUSCAR</button>
            </div>
            <div className="inputDecoration">
                <img className='dots' src='img/dots.jpg' alt='dots'></img>
            </div>
            <div className="findCommerces">
                {findCommerces?.map (commerce => <div>{commerce.name}</div>) }
            </div>
        </div>
    )
   
    
}


export default Home;