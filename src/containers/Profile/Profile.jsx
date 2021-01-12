import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GET_OPINIONS } from '../../redux/types';


import './Profile.scss';

const Profile = (props) => {

    useEffect(() => {

        let id = props.user.id

        axios.get(process.env.REACT_APP_API_URL + `/opinions/getByUser/${id}`)
            .then(res => {
                props.dispatch({ type: GET_OPINIONS, payload: res.data });
            })
    }, [])


    return (

        <div>
            <div className="headerProfile">
                Bienvenid@ {props.user.name}
            </div>
            <div className="bodyProfile">
                {props.opinions?.map(opinion => {
                    return (
                        <div className="cardProfile">
                            <div className="nameCommerce">
                                {opinion.Commerce.name}
                            </div>
                            <div className="imageCardProfile">
                                <img className="commerceImage" src={opinion.Commerce.image}></img>
                            </div>
                            <div className="opinionCommerce">
                                {opinion.opinion}
                            </div>
                            <div className="voteOpinion">
                                {opinion.vote}
                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}
const mapStateToProps = state => {
    return {
        user: state.user,
        opinions: state.opinions
    }
}
export default connect(mapStateToProps) (Profile);