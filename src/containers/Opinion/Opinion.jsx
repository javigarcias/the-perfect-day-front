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
            <div className="commerceZone">
                <div className="cardCommerce">
                    <div className="tittleCommerce">
                        {props.commerce.name}
                    </div>
                    <div className="imageZone">
                        <img className="commerceImageOpinion" src={props.commerce.image}></img>
                    </div>
                    <div className="valoration">
                        Opiniones:  Puntuación Media:
                    </div>
                    <div className="reviewCommerce">
                        {props.commerce.review}
                    </div>
                </div>
            </div>
            <div className="opinionsZone">
                <div>
                    {props.opinions?.map(opinion => {
                        return (
                            <div className="opinionCard">
                                <div className="valorationOpinion">
                                    {opinion.vote}
                                </div>
                                <div className="bodyOpinion">
                                    <div className="headerOpinion">
                                        <div className="autorOpinion">
                                            {opinion.User.name} {opinion.User.surname}
                                        </div>

                                    </div>
                                    <div className="opinionDescription">
                                        {opinion.opinion}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
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
