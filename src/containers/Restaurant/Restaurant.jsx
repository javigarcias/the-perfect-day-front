import React, { useEffect } from 'react';
import axios from 'axios';

import './Restaurant.scss';
import { GET_ALL_RESTAURANTS } from '../../redux/types';
import { connect } from 'react-redux';

const Restaurant = (props) => {

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL +'/commerces/restaurants')
            .then(res => {
                props.dispatch({ type: GET_ALL_RESTAURANTS, payload: res.data });
            })
    }, [])
    
    return (
        <div className="restaurant">
            {props.restaurants?.map(restaurant => {
                return (
                    <div className="cardRestaurant">
                        <h3>{restaurant.name}</h3>
                        <h4>{restaurant.city}</h4>
                        <img className="restaurantImage" src={restaurant.image}></img>
                        <p>{restaurant.review}</p>
                    </div>
                )
            } )}
        </div>
    )
    

}
const mapStateToProps = state => {
    return {
        restaurants: state.restaurants
    }
}
export default connect(mapStateToProps) (Restaurant);
