import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { GET_COMMERCES} from '../../redux/types';

import axios from 'axios';

import './Review.scss';

const Review = (props) => {

    const history = useHistory();
    const [search, setSearch] = useState("");
    const [commerceSelected, setCommerceSelected] = useState();
    const [messageOk, setMessageOk] = useState();
    const [messageError, setMessageError] = useState();

    const userId = props.user.id;
    console.log('Comercio seleccionado: ',commerceSelected)
    console.log('Id Usuario logeado: ',userId)
    
    //const [findCommerces, setFindCommerces] = useState([]);

    if (!props.user.id){
        setMessageError("Debes iniciar sesión");
        setTimeout(() => {
            history.push("/login")
        }, 1500);

    }

    const handleSearch = event => {
        setSearch(event.target.value)
        //searchCommerce(props)
        //console.log(search)
    }

    const handleOpinion = event => {
        event.preventDefault();

        if(!commerceSelected){
            setMessageError("Debes seleccionar un proveedor");
            return;
        }
        if(event.target.vote.value < 0 || event.target.vote.value > 5){
            setMessageError("Tu puntuación debe ser un número entre 0 y 5");
            return;
        }
    

        const opinionBody = {
            UserId: userId,
            CommerceId: commerceSelected,
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

    const searchCommerce = (props) => {
        //console.log(search)
        //console.log(props.commerces)
        const result = props.commerces?.filter(commerce => {
            return commerce.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
        if (search){
            return result.map(commerce => 
            <div className="commerces">
                <div className="cardCommerces">
                    <h3>{commerce.name} - {commerce.city}</h3>
                    <img className="commerceImage" src={commerce.image}></img>
                    <p>{commerce.review}</p>
                    <button className="selectButtom" onClick={() => setCommerceSelected(commerce.id)}>Selecciona</button>

                </div>
            </div>
        )
        }
        //console.log(result)
        //setFindCommerces(result)
        //console.log('Find commerces',findCommerces)
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces')
            .then(res => {
                props.dispatch({ type: GET_COMMERCES, payload: res.data });
            })
    }, [])
/*
    const showResult = () => {
        if (!findCommerces?.[0]){
            console.log('Dentro if...',findCommerces)
            return(
                <div>No hay resultado</div>
            )
        }
        console.log('Hay resultado!!')
        return (
            <div>
                <div>Hay resultado!!!</div>
                {findCommerces?.map(commerce => {
                    {console.log('Dentro del mapeo...',commerce)}
                    <div className="cardCommerces">
                    <h3>{commerce.name}</h3>
                    <img className="commerceImage" src={commerce.image}></img>
                    </div>
                })}
            
            </div>
          
        )
    }
*/
    return (
        <div className="review">
            <div className="searchZone">
                <h3>Busca y selecciona tu proveedor</h3>
                <input type='text' placeholder="Introduce proveedor" onKeyUp={handleSearch} />
                <div className="commercesFound">
                   {searchCommerce(props)}
                </div>
            </div>
            <div className="reviewZone">
                <form className='inputReview' onSubmit={handleOpinion}>
                    <div className='inputName'>Valoración (0-5)</div>
                    <div>
                        <input type='number' name='vote' required />
                    </div>
                    <div className='inputName'>Escribe tu opinión</div>
                    <div>
                        <textarea  name='opinion' />
                    </div>
                    <div className='buttons'>
                        <button className='publishButton' type='submit'>Publicar</button>
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
        user: state.user
    }
}

export default connect(mapStateToProps) (Review);