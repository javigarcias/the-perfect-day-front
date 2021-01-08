import React, { useEffect } from 'react';
import axios from 'axios';

import './Photographers.scss';
import { GET_ALL_PHOTOGRAPHERS} from '../../redux/types';
import { connect } from 'react-redux';

const Photographers = (props) => {

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces/photographers')
            .then(res => {
                props.dispatch({ type: GET_ALL_PHOTOGRAPHERS, payload: res.data });
            })
    }, [])
    
    return (
        <div className="commerces">
            {props.photographers?.map(photographer => {
                return (
                    <div className="cardCommerces">
                        <h3>{photographer.name} - {photographer.city}</h3>
                        <img className="commerceImage" src={photographer.image}></img>
                        <p>{photographer.review}</p>
                    </div>
                )
            } )}
        </div>
    )
    

}
const mapStateToProps = state => {
    return {
        photographers: state.photographers
    }
}
export default connect(mapStateToProps) (Photographers);
