import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_OPINIONS } from '../../redux/types';
import { connect } from 'react-redux';


import './Opinion.scss';

const Opinion = (props) => {


    useEffect(() => {

        let id = props.commerce.id

        axios.get(process.env.REACT_APP_API_URL + `/opinions/getByCommerce/${id}`)
            .then(res => {
                props.dispatch({ type: GET_OPINIONS, payload: res.data });
            })


    }, []);

    return(
        <div className="opinion">
            <div className="cardCommerces">
                <div className="tittleCard">
                    <h3>{props.commerce.name}</h3>
                </div>
                <div className="imageCard">
                    <img className="commerceImage" src={props.commerce.image}></img>
                </div>
                <div className="reviewCard">
                    <p>{props.commerce.review}</p>
                </div>    
            </div>
            <div>
                {props.opinions?.map(opinion => {
                    return (
                        <div>
                            {opinion.vote}
                        </div>
                    )
                })}
              
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        opinions: state.opinions,
        commerce: state.commerce
    }
}
export default connect(mapStateToProps) (Opinion);
