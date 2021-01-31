import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { GET_COMMERCES, SHOW_COMMERCE } from '../../redux/types';

import axios from 'axios';

import './Review.scss';

const Review = (props) => {

    const history = useHistory();
    const [search, setSearch] = useState("");
    const [commerceSelected, setCommerceSelected] = useState();
    const [messageOk, setMessageOk] = useState();
    const [messageError, setMessageError] = useState();
    const [messageLogin, setMessageLogin] = useState();
    const [messageCommerce, setMessageCommerce] = useState();
    const userId = props.user.id;
    console.log(commerceSelected)
    
    

    useEffect(() => {
        //Comprueba que hay un usuario logeado, de no ser así, redirecciona a /login
        if (!props.user.id){
            setMessageLogin("Debes iniciar sesión");
            setTimeout(() => {
                history.push("/login")
            }, 2000);
        }
        //Muestra el comercio si se ha seleccionado previamente
        setMessageCommerce(props.commerce.name)
        //Carga en Redux todos los comercios para tener un acceso rapido en la busqueda con una sola peticion a la BD
        axios.get(process.env.REACT_APP_API_URL +'/commerces')
            .then(res => {
                props.dispatch({ type: GET_COMMERCES, payload: res.data });
            })
    }, [])


    const selectCommerce = (commerce) => {
        setMessageCommerce(commerce.name)
        props.dispatch({ type: SHOW_COMMERCE, payload: commerce})
    }

    const handleSearch = event => {
        setSearch(event.target.value)
    }

    const handleOpinion = event => {
        event.preventDefault();

        //Comprobamos que se ha seleccionado un comercio
        if(!props.commerce){
            setMessageError("Debes seleccionar un proveedor");
            return;
        }
        //Comprobamos que la puntuación se encuentra entre 0 y 5
        if(event.target.vote.value < 0 || event.target.vote.value > 5){
            setMessageError("Tu puntuación debe ser un número entre 0 y 5");
            return;
        }

        const opinionBody = {
            UserId: userId,
            CommerceId: props.commerce.id,
            vote: event.target.vote.value,
            opinion: event.target.opinion.value
        };
        axios.post(process.env.REACT_APP_API_URL + '/opinions/create', opinionBody)
        .then(res => {
            setMessageOk(`${props.user.name} Su opinión ha sido publicada exitosamente`);
                setTimeout(() => {
                    history.push("/")
                }, 1500);
        })

    }
    //Busca el comercio introducido en el imput localizando todas las coincidencias por cada letra introducida
    const searchCommerce = (props) => {

        const result = props.commerces?.filter(commerce => {
            return commerce.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
        if (search){
            return result.map(commerce => 
            <div className="commerces">
                    <div className="cardCommerces" key={commerce.id}>
                        <div className="tittleCard">
                            {commerce.name}  
                        </div>
                        <div className="subtittleCard">
                            {commerce.city}
                        </div>
                        <div className="imageCard">
                            <img className="commerceImage" src={commerce.image}></img>
                        </div>
                        <div className="buttonCard">
                            <button className="opinionButton" onClick={ () => { selectCommerce(commerce) }}>SELECCIONAR</button>
                        </div>
                    </div>
            </div>
        )}
    }

    return (
        <div className="review">
            <div className="searchZone">
                <h3>Busca y selecciona tu proveedor</h3>
                <input type='text' placeholder="Introduce proveedor" onKeyUp={handleSearch} />
                <div className='messageLogin'>
                    {messageLogin}
                </div>
                <div className="commercesFound">
                   {searchCommerce(props)}
                </div>
            </div>
            <div className="reviewZone">
                <div className="commerceSelected">
                    <div className="tittleCommerceSelect">Comercio Seleccionado</div>
                    <div className="commerceName">
                    {messageCommerce}
                    </div>
                </div>
                <form className='inputReview' onSubmit={handleOpinion}>
                    <div className='inputName'>Valoración (0-5)</div>
                    <div>
                        <input type='number' name='vote' required />
                    </div>
                    <div className='inputName'>Escribe tu opinión</div>
                    <div>
                        <textarea  name='opinion' />
                    </div>
                    <div className='buttonCard'>
                        <button className='opinionButton' type='submit'>Publicar</button>
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
const mapStateToProps = state => {
    return {
        commerces: state.commerces,
        user: state.user,
        commerce: state.commerce
    }
}
export default connect(mapStateToProps) (Review);