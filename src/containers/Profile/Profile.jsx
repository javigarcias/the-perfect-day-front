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

        <div className="profile">
            <div className="headerProfile">
                Bienvenid@ {props.user.name}, estas son tus opiniones publicadas
            </div>
            <div className="bodyProfile">
                {props.opinions?.map(opinion => {
                    return (
                        <div className="opinionCard">
                                <div className="valorationOpinion">
                                    {opinion.vote}
                                </div>
                                <div className="bodyOpinion">
                                    <div className="headerOpinion">
                                        <div className="autorOpinion">
                                            {opinion.Commerce.name} 
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
    )
}
const mapStateToProps = state => {
    return {
        user: state.user,
        opinions: state.opinions
    }
}
export default connect(mapStateToProps) (Profile);