import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GET_COMMERCES} from '../../redux/types';

import axios from 'axios';

import './Review.scss';

const Review = (props) => {

    const [search, setSearch] = useState("");
    //const [findCommerces, setFindCommerces] = useState([]);

    const handleSearch = event => {
        setSearch(event.target.value)
        //searchCommerce(props)
        console.log(search)
    }

    const handleSubmit = event => {
        event.preventDefault();

    }

    const searchCommerce = (props) => {
        console.log(search)
        console.log(props.commerces)
        const result = props.commerces?.filter(commerce => {
            return commerce.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
        if (search){
            return result.map(commerce => <div key={commerce.id} > {commerce.name}</div>)
        }
        console.log(result)
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
                <form className='inputReview' onSubmit={handleSubmit}>
                    <div className='inputName'>Valoración (0-5)</div>
                    <div>
                        <input type='text' name='vote' required />
                    </div>
                    <div className='inputName'>Escribe tu opinión</div>
                    <div>
                        <textarea  name='opinion' />
                    </div>
                    <div className='buttons'>
                        <button className='publishButton' type='submit'>Publicar</button>
                    </div>

                </form>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        commerces: state.commerces
    }
}

export default connect(mapStateToProps) (Review);