import React, { useEffect, useHistory } from 'react';
import axios from 'axios';

import './Restaurant.scss';
import { GET_ALL_RESTAURANTS, SHOW_COMMERCE } from '../../redux/types';
import { connect } from 'react-redux';

const Restaurant = (props) => {

    const history = useHistory();

    const showOpinions = async (restaurant) => {
        props.dispatch({ type: SHOW_COMMERCE, payload: restaurant});
        history.push('/');


    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces/restaurants')
            .then(res => {
                props.dispatch({ type: GET_ALL_RESTAURANTS, payload: res.data });
            })
    }, [])
    
    return (
        <div className="commerces">
            {props.restaurants?.map(restaurant => {
                return (
                    <div className="cardCommerces">
                        <h3>{restaurant.name} - {restaurant.city}</h3>
                        <img className="commerceImage" src={restaurant.image}></img>
                        <p>{restaurant.review}</p>
                        <button className="buttons" onClick={ () => { showOpinions(restaurant) }}>Ver Opiniones</button>
                    </div>
                )
            } )}
        </div>
    )
    

}
const mapStateToProps = state => {
    return {
        restaurants: state.restaurants,
        commerce: state.commerce
    }
}
export default connect(mapStateToProps) (Restaurant);
