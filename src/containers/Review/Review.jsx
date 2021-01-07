import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { GET_COMMERCES} from '../../redux/types';

import axios from 'axios';

import './Review.scss';

const Review = (props) => {

    const [search, setSearch] = useState("");

    const handleSearch = event => {
        setSearch(event.target.value)
        console.log(search)
    }

    const handleSubmit = event => {
        event.preventDefault();

    }

    const searchCommerce = (props) => {
        console.log("entra en search")
        const result = props.commerces?.filter(commerce => {
            return commerce.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
            return result?.map(commerce => {
                <div className="cardCommerces">
                    <h3>{commerce.name}</h3>
                    <img className="commerceImage" src={commerce.image}></img>
                </div>
            }) 
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces')
            .then(res => {
                props.dispatch({ type: GET_COMMERCES, payload: res.data });
            })
    }, [])

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