import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './Restaurant.scss';
import { GET_ALL_RESTAURANTS, SHOW_COMMERCE } from '../../redux/types';
import { connect } from 'react-redux';

const Restaurant = (props) => {

    const history = useHistory();

    const showOpinions = async (restaurant) => {
        props.dispatch({ type: SHOW_COMMERCE, payload: restaurant});
        history.push('/opinion');
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
                    <div className="cardCommerces" key={restaurant.id}>
                        <div className="tittleCard">
                            {restaurant.name}  
                        </div>
                        <div className="subtittleCard">
                            {restaurant.city}
                        </div>
                        <div className="imageCard">
                            <img className="commerceImage" src={restaurant.image}></img>
                        </div>
                        <div className="buttonCard">
                            <button className="opinionButton" onClick={ () => { showOpinions(restaurant) }}>Ver Opiniones</button>
                        </div>
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
